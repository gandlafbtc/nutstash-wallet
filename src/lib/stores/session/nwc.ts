import NDK, { NDKEvent, NDKPrivateKeySigner, NDKKind, NDKSubscription, type NDKFilter } from "@nostr-dev-kit/ndk";
import { bytesToHex } from '@noble/hashes/utils' // already an installed dependency
import { nip04, generateSecretKey, getPublicKey } from 'nostr-tools'
import { get } from "svelte/store";
import { toast } from "svelte-sonner";
import { decode } from "@gandlaf21/bolt11-decode";
import { getAmountForTokenSet, getProofsOfMintUnit } from "$lib/util/walletUtils";
import { mints } from "../persistent/mints";
import { proofsStore } from "../persistent/proofs";
import { createMeltQuote, meltProofs } from "$lib/actions/actions";
import type { NWCConnection } from "$lib/db/models/types";
import { nwcKeysStore } from "../persistent/nwcConnections";
import { relaysStore } from "../persistent/relays";



type NWCCommand = {
  method: string,
  params: any
}

type NWCResult = {
  result_type: string,
  result: any
}

type NWCError = {
  result_type: string,
  error: {
    code: string,
    message: string
  }
}

const NWCKind = {
  NWCInfo: 13194,
  NWCRequest: 23194,
  NWCResponse: 23195
}

const createNWC = () => {
  const supportedMethods = ["pay_invoice", "get_balance", "get_info", "list_transactions"]
  let ndk = new NDK()
  let blocking = false
  let subscriptions = [] as NDKSubscription[]
  let nwcEnabled = true

  const init = async () => {
    const connections = get(nwcKeysStore)
    for (const connection of connections) {
      if (connection.isActive) {
        await generateNWCConnection()
        await listenToNWCCommands()
      }
    }
  }

  const handleGetInfo = (nwcCommand: NWCCommand) => {
    console.log("### get_info", nwcCommand.method)
    return {
      result_type: "get_info",
      result: {
        alias: "nutstash",
        color: "#FFAACC",
        pubkey: get(nwcKeysStore)[0].walletPublicKey,
        network: "mainnet",
        block_height: 1,
        block_hash: "psh",
        methods: supportedMethods
      }
    }
  }
  const handleGetBalance = async (nwcCommand: NWCCommand) => {
    const proofsForMint = getProofsOfMintUnit(get(mints)[0], get(proofsStore), 'sat')
    const activeBalance = getAmountForTokenSet(proofsForMint)
    console.log("### get_balance", nwcCommand.method)
    return {
      result_type: "get_balance",
      result: {
        balance: activeBalance * 1000
      }
    }
  }

  const handlePayInvoice = async (nwcCommand: NWCCommand) => {
    const connections = get(nwcKeysStore)
    const invoice = nwcCommand.params.invoice
    const amountMsat = nwcCommand.params.amount
    console.log("### pay_invoice", nwcCommand.method)
    console.log("### invoice", invoice)
    console.log("### amountMsat", amountMsat)
    // pay invoice
    try {
      await decode(invoice)
    } catch (e) {
      console.log("### error decoding invoice", e)
      return {
        result_type: nwcCommand.method,
        error: { code: "INTERNAL", message: "Invalid invoice" }
      } as NWCError
    }

    const quote = await createMeltQuote(get(mints)[0].url, invoice, { unit: "sat" })
    if (quote.amount == 0 || quote.error) {
      toast.warning("NWC: Error requesting melt quote")
      return {
        result_type: nwcCommand.method,
        error: { code: "INTERNAL", message: "Error requesting melt quote" + quote.error }
      } as NWCError
    }
    const maximumAmount = quote.amount + quote.fee_reserve

    if (maximumAmount > connections[0].allowanceLeft) {
      toast.warning("NWC: Allowance exceeded")
      return {
        result_type: nwcCommand.method,
        error: { code: "QUOTA_EXCEEDED", message: "Your quota has exceeded" }
      } as NWCError
    }
    try {
      const meltData = await meltProofs(quote)
      const paidAmount = quote.amount + getAmountForTokenSet(meltData.change);
      const newAllowance = connections[0].allowanceLeft - paidAmount;
      const conn = {...connections[0]}
      conn.allowanceLeft = newAllowance
      await nwcKeysStore.addOrUpdate(connections[0].walletPublicKey, conn, 'walletPublicKey')

      return {
        result_type: nwcCommand.method,
        result: {
          preimage: meltData.quoteToStore.payment_preimage,
        }
      }
    } catch (e) {
      return {
        result_type: nwcCommand.method,
        error: { code: "INTERNAL", message: "Could not pay invoice" }
      } as NWCError
    }

  }

  const handleListTransactions = async (nwcCommand: NWCCommand) => {
    console.log("### list_transactions", nwcCommand.method)
    type nwcTransaction = {
      type: string,
      invoice: string,
      description: string | null,
      preimage: string | null,
      payment_hash: string | null,
      amount: number,
      fees_paid: number | null,
      created_at: number,
      settled_at: number | null
      expires_at: number | null
    }
    const from = nwcCommand.params.from || 0
    const until = nwcCommand.params.until || Math.floor(Date.now() / 1000)
    const limit = nwcCommand.params.limit || 10
    const offset = nwcCommand.params.offset || 0
    const unpaid = nwcCommand.params.unpaid || false
    const type = nwcCommand.params.type || undefined

    //todo fill this
    const transactionsHistory: any[] = []

    const transactions = transactionsHistory.map((invoice: any) => {
      let type = invoice.amount > 0 ? "incoming" : "outgoing"
      let amount = Math.abs(invoice.amount) * 1000
      let created_at = Math.floor(new Date(invoice.date).getTime() / 1000)
      let settled_at = invoice.status == "paid" ? Math.floor(new Date(invoice.date).getTime() / 1000) : null
      return {
        type: type,
        invoice: invoice.bolt11,
        description: invoice.memo,
        amount: amount,
        fees_paid: 0,
        created_at: created_at,
        settled_at: settled_at,
      } as nwcTransaction
    })

    return {
      result_type: "list_transactions",
      result: {
        transactions: transactions
      }
    }
  }
  // ––––---------- NWC Connection ––––----------
  const replyNWC = async (result: NWCResult | NWCError, event: NDKEvent, conn: NWCConnection) => {
    // reply to NWC with result
    let replyEvent = new NDKEvent(event.ndk);
    replyEvent.kind = 23195;
    console.log("### replying with", JSON.stringify(result))
    replyEvent.content = await nip04.encrypt(conn.walletPrivateKey, event.author.pubkey, JSON.stringify(result));
    replyEvent.tags = [["p", event.author.pubkey], ["e", event.id]];
    console.log("### replyEvent", replyEvent)
    console.log("### replying to", event.id)
    // await this.ndk.publish(replyEvent);
    await replyEvent.publish()
  }

  const parseNWCCommand = async (command: string, event: NDKEvent, conn: NWCConnection) => {
    // parse command to JSON object {method: 'pay_invoice', params: {invoice: '1234'}}
    let nwcCommand: NWCCommand = JSON.parse(command)
    let result: NWCResult | NWCError
    console.log("### nwcCommand", nwcCommand)
    // parse "get_info" without params
    if (nwcCommand.method == "get_info") {
      result = await handleGetInfo(nwcCommand)
    } else if (nwcCommand.method == "get_balance") {
      result = await handleGetBalance(nwcCommand)
    } else if (nwcCommand.method == "pay_invoice") {
      if (blocking) {
        result = {
          result_type: nwcCommand.method,
          error: { code: "INTERNAL", message: "Already processing a payment." }
        } as NWCError
      }
      blocking = true
      try {
        result = await handlePayInvoice(nwcCommand)
      } catch (e) {
        console.error(e)
        return
      } finally {
        blocking = false
      }
    } else if (nwcCommand.method == "list_transactions") {
      result = await handleListTransactions(nwcCommand)
    } else {
      console.log("### method not supported", nwcCommand.method)
      result = {
        result_type: nwcCommand.method,
        error: { code: "NOT_IMPLEMENTED", message: "Method not supported" }
      } as NWCError;
    }
    await replyNWC(result, event, conn)
  }
  const getConnectionString = (connection: NWCConnection) => {
    const relays = get(relaysStore).filter(r => r.isOn).map((relay) => relay.url)
    const walletPublicKeyHex = connection.walletPublicKey
    const connectionSecretHex = connection.connectionSecret
    return `nostr+walletconnect://${walletPublicKeyHex}?relay=${relays.join('&relay=')}&secret=${connectionSecretHex}`
  }

  const generateNWCConnection = async () => {
    const relays = get(relaysStore).filter(r => r.isOn).map((relay) => relay.url)
    const connections = get(nwcKeysStore)
    let conn: NWCConnection
    // NOTE: we only support one connection for now
    if (!connections.length) {
      const sk = generateSecretKey() // `sk` is a Uint8Array
      const walletPublicKeyHex = getPublicKey(sk) // `pk` is a hex string
      const walletPrivateKeyHex = bytesToHex(sk)

      const connectionSecret = generateSecretKey()
      const connectionPublicKeyHex = getPublicKey(connectionSecret)
      const connectionSecretHex = bytesToHex(connectionSecret)
      conn = {
        walletPublicKey: walletPublicKeyHex,
        walletPrivateKey: walletPrivateKeyHex,
        connectionSecret: connectionSecretHex,
        connectionPublicKey: connectionPublicKeyHex,
        counter: 0,
        isActive: true,
        allowanceLeft: 1000
      } as NWCConnection;
      await nwcKeysStore.addOrUpdate(conn.walletPublicKey, conn, 'walletPublicKey')
    } else {
      conn = connections[0]
    }

    const walletSigner = new NDKPrivateKeySigner(conn.walletPrivateKey)
    // close and delete all old subscriptions
    unsubscribeNWC()
    ndk = new NDK({ explicitRelayUrls: relays, signer: walletSigner });
    ndk.connect();

    const nip47InfoEvent = new NDKEvent(ndk);
    nip47InfoEvent.kind = NWCKind.NWCInfo;
    nip47InfoEvent.content = supportedMethods.join(' ')
    try {
      // let's fetch the info event from the relay to see if we need to republish it
      // use NWCKind.NWCInfo as an integer here
      let filterInfoEvent: NDKFilter = { kinds: [NWCKind.NWCInfo], authors: [conn.walletPublicKey] };
      let eventsInfoEvent = await ndk.fetchEvents(filterInfoEvent);
      if (eventsInfoEvent.size === 0) {
        await nip47InfoEvent.publish()
        console.log("### published nip47InfoEvent", nip47InfoEvent)
      } else {
        console.log("### nip47InfoEvent already published")
      }
    } catch (e) {
      console.log("### could not publish nip47InfoEvent", nip47InfoEvent)
      console.log("### error", e)
    }
  }
  const listenToNWCCommands = async () => {
    const relays = get(relaysStore).filter(r => r.isOn).map((relay) => relay.url)
    // if (!this.connections.length) {
    //   await this.generateNWCConnection()
    // }
    await generateNWCConnection()
    // we only support one connection for now
    const conn = get(nwcKeysStore)[0]

    const currentUnitTime = Math.floor(Date.now() / 1000)
    let filter = {
      kinds: [NWCKind.NWCRequest as NDKKind],
      since: currentUnitTime,
      authors: [conn.connectionPublicKey],
      "#p": [conn.walletPublicKey]
    } as NDKFilter;
    const sub = ndk.subscribe(filter);
    console.log("### subscribing to NWC on relays: ", relays)
    subscriptions.push(sub)

    sub.on("eose", () => console.log("All relays have reached the end of the event stream"));
    sub.on("close", () => console.log("Subscription closed"));

    sub.on("event", async (event) => {
      if (event.kind != NWCKind.NWCRequest) {
        return // ignore non-NWC events
      }
      if (!nwcEnabled) {
        console.log("### Received NWC command but NWC is disabled")
        return
      }
      console.log("### NWC request!")
      console.log("### event", event)
      const decryptedContent = await nip04.decrypt(conn.connectionSecret, conn.walletPublicKey, event.content)
      // console.log("### decryptedContent", decryptedContent)
      await parseNWCCommand(decryptedContent, event, conn)
    });
  }

  const unsubscribeNWC = () => {
    console.log("### unsubscribing from NWC")
    for (let sub of subscriptions) {
      sub.stop()
    }
    subscriptions = []
  }

  return {
    getConnectionString,
    unsubscribeNWC,
    generateNWCConnection,
    listenToNWCCommands,
    init
  }
}



export const nwc = createNWC()
