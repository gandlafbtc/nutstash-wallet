import { countsStore } from "$lib/stores/persistent/counts"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { mints } from "$lib/stores/persistent/mints"
import { pendingProofsStore, proofsStore, spentProofsStore } from "$lib/stores/persistent/proofs"
import { transactionsStore } from "$lib/stores/persistent/transactions"
import { getCount } from "$lib/util/utils"
import { formatAmount, getAmountForTokenSet, getAproxAmount, getExactAmount, getMintForKeysetId, getUnitForKeysetId, getWalletWithUnit, separateProofsById } from "$lib/util/walletUtils"
import { getDecodedToken, decodePaymentRequest, MeltQuoteState, MintQuoteState, type MeltQuoteResponse, type Proof, type Token, PaymentRequest, PaymentRequestTransportType, type PaymentRequestTransport, CashuMint, CashuWallet, CheckStateEnum } from "@cashu/cashu-ts"
import { get } from "svelte/store"
import { bytesToHex, randomBytes } from "@noble/hashes/utils"
import { EXPIRED, TransactionStatus, TransactionType, type Mint, type StoredMeltQuote, type StoredMintQuote, type StoredPaymentRequest, type StoredTransaction } from "$lib/db/models/types"
import { toast } from "svelte-sonner"
import { meltQuotesStore } from "$lib/stores/persistent/meltquotes"
import { decode } from "@gandlaf21/bolt11-decode"
import { getNprofile } from "./nostr"
import { cashuRequestsStore } from "$lib/stores/persistent/requests"
import { hashToCurve } from "@cashu/crypto/modules/common"

export const createMintQuote = async (mintUrl: string, amount: number, options?: { unit?: string }) => {
    const wallet = await getWalletWithUnit(get(mints), mintUrl, options?.unit)
    const quote = await wallet.createMintQuote(amount)
    if (!quote) {
        throw new Error(`Error when creating mint quote for ${mintUrl}`)
    }
    const quoteToStore: StoredMintQuote = { ...quote, createdAt: Date.now(), lastChangedAt: Date.now(), mintUrl, unit: options?.unit ?? 'sat', amount, type: 'mint' }
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    return quoteToStore
}

export const createMeltQuote = async (mintUrl: string, invoice: string, options?: { unit?: string }) => {
    const amount = decode(invoice).sections[2].value / 1000
    if (!amount) {
        throw new Error(`Decoding invoice failed for ${invoice}`)
    }
    const wallet = await getWalletWithUnit(get(mints), mintUrl, options?.unit)
    const quote = await wallet.createMeltQuote(invoice)
    if (!quote) {
        throw new Error(`Error when creating melt quote for ${mintUrl}`)
    }
    const quoteToStore: StoredMeltQuote = { ...quote, request: invoice, createdAt: Date.now(), lastChangedAt: Date.now(), mintUrl, unit: options?.unit ?? 'sat', type: 'melt' }
    await meltQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    return quoteToStore
}

export const checkMintQuote = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    const quoteToStore: StoredMintQuote = { ...quote }
    quoteToStore.state = updatedQuote.state
    quoteToStore.lastChangedAt = Date.now()
    if (quoteToStore.state === MintQuoteState.UNPAID && Math.floor(quoteToStore.lastChangedAt / 1000) > quoteToStore.expiry) {
        quoteToStore.state = EXPIRED.EXPIRED
    }
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    return quoteToStore
}

export const checkMeltQuote = async (quote: StoredMeltQuote) => {
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const updatedQuote = await wallet.checkMeltQuote(quote.quote)
    const quoteToStore: StoredMeltQuote = { ...quote }
    quoteToStore.state = updatedQuote.state
    quoteToStore.lastChangedAt = Date.now()
    if (quoteToStore.state === MeltQuoteState.UNPAID && Math.floor(quoteToStore.lastChangedAt / 1000) > quoteToStore.expiry) {
        quoteToStore.state = EXPIRED.EXPIRED
    }
    await meltQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    return quoteToStore
}

export const mintProofs = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const quoteToStore = { ...quote }

    let currentCount = getCurrentCount(wallet.keysetId)

    const proofs = await wallet.mintProofs(quote.amount, quote.quote, { counter: currentCount })

    await proofsStore.addMany(proofs)
    if (proofs.length) {
        quoteToStore.out = proofs
        let endCount = proofs.length
        endCount = endCount + currentCount
        await updateCount(wallet.keysetId, endCount)
        quoteToStore.counts = { keysetId: wallet.keysetId, counts: getCount(currentCount, endCount) }
    }
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    quoteToStore.state = updatedQuote.state
    quoteToStore.lastChangedAt = Date.now()
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    toast.success(`Received ${formatAmount(getAmountForTokenSet(proofs), quoteToStore.unit)}`, {
        description: `At mint ${quoteToStore.mintUrl}`
    })
}

export const meltProofs = async (quote: StoredMeltQuote, options?: {privkey?: string}) => {
    if (quote.state === EXPIRED.EXPIRED) {
        throw new Error("Melt quote expired");
    }
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const quoteToStore = { ...quote }
    const totalAmount =  quote.amount+quote.fee_reserve
    const {aproxProofs,currentCount, endCount ,keep,keysetId, send } = await doSend(quote.mintUrl, totalAmount, { unit: quote.unit, privkey : options?.privkey })
    const qquote: MeltQuoteResponse = {
        quote: quote.quote,
        amount: quote.amount,
        fee_reserve: quote.fee_reserve,
        state: quote.state,
        expiry: quote.expiry,
        payment_preimage: null
    }
    const {change, quote: updatedQuote} = await wallet.meltProofs(qquote, send, { counter : endCount})
    await proofsStore.addMany(change)
    await updateCount(keysetId, endCount+change.length+1)
    quoteToStore.lastChangedAt = Date.now()
    quoteToStore.state = updatedQuote.state
    quoteToStore.payment_preimage = updatedQuote.payment_preimage
    quoteToStore.in = aproxProofs
    quoteToStore.out = change
    quoteToStore.fees =  (updatedQuote.fee_reserve-getAmountForTokenSet(change))+(getAmountForTokenSet(aproxProofs)-(getAmountForTokenSet(keep)+getAmountForTokenSet(send)))
    await meltQuotesStore.addOrUpdate(quoteToStore.quote, quoteToStore, 'quote')
    toast.success('Paid invoice'+ formatAmount(quote.amount,'sat'))
    return {change, quoteToStore}
}

export const receiveEcash = async (token: string | Token, options?:{pubkey?:string, privkey?:string}): Promise<{ untrustedMint?: string, proofs: Proof[] }> => {
    if (typeof token === "string") {
        try {
            token = getDecodedToken(token)
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
    const mint = mints.getBy(token.mint, 'url')
    if (!mint) {
        return { untrustedMint: token.mint, proofs: [] }
    }
    const wallet = await getWalletWithUnit(get(mints), token.mint, token.unit)
    const currentCount = getCurrentCount(wallet.keysetId)
    const proofs = await wallet.receive(token, { counter: currentCount, ...options })
    let endCount = currentCount
    if (proofs?.length) {
        await proofsStore.addMany(proofs)
        endCount = endCount + proofs.length
        await updateCount(wallet.keysetId, endCount)
    }
    const transactionToAdd: StoredTransaction = {
        id: bytesToHex(randomBytes(12)),
        type: TransactionType.RECEIVE,
        in: token.proofs,
        out: proofs,
        mintUrl: token.mint,
        unit: token.unit,
        createdAt: Date.now(),
        lastChangedAt: Date.now(),
        amount: getAmountForTokenSet(token.proofs),
        counts: { keysetId: wallet.keysetId, counts: getCount(currentCount, endCount) },
        state: TransactionStatus.COMPLETED,
        fees: getAmountForTokenSet(token.proofs) - getAmountForTokenSet(proofs)
    }

    await transactionsStore.addOrUpdate(transactionToAdd.id, transactionToAdd, 'id')
    toast.success('Token received', {description: formatAmount(getAmountForTokenSet(token.proofs), token.unit)})
    return { proofs }

}

const doSend = async (mintUrl: string, amount: number, options?:{unit?: string, includeFees?: boolean, pubkey?: string, privkey?: string}) => {
    const wallet = await getWalletWithUnit(get(mints), mintUrl, options?.unit)
    const mintUnitProofs = proofsStore.getByKeysetIds(wallet.keysets.map((ks) => ks.id))
    const aproxProofs = getAproxAmount(amount, mintUnitProofs, options?.includeFees)
    if (!aproxProofs) {
        throw new Error("Not enough funds");
    }
    const currentCount = getCurrentCount(wallet.keysetId)
    const { send, keep } = await wallet.send(amount, aproxProofs, { counter: currentCount, includeFees:  options?.includeFees, privkey: options?.privkey, pubkey: options?.pubkey })
    const mintUnitProofIds = mintUnitProofs.map((p) => p.secret)
    await proofsStore.removeMany(aproxProofs.map(p=>p.secret), 'secret')
    await proofsStore.addMany(keep)
    await pendingProofsStore.addMany(send)
    const newKeepProofCount = keep.reduce((acc, p) => mintUnitProofIds.includes(p.id) ? acc : acc + 1, 0)
    const newSendProofCount = send.reduce((acc, p) => mintUnitProofIds.includes(p.id) ? acc : acc + 1, 0)
    let endCount = newSendProofCount + newKeepProofCount
    endCount = endCount + currentCount
    await updateCount(wallet.keysetId, endCount)
    return { send, keep, endCount , aproxProofs, keysetId: wallet.keysetId, currentCount }
}

export const sendEcash = async (mintUrl: string, amount: number, options?:{unit?: string, includeFees?: boolean, pubkey?: string, privkey?: string}) => {
    const {send, keep, aproxProofs, endCount, keysetId, currentCount } = await  doSend(mintUrl, amount, options)

    const transactionToAdd: StoredTransaction = {
        id: bytesToHex(randomBytes(12)),
        type: TransactionType.SEND,
        mintUrl: mintUrl,
        amount: getAmountForTokenSet(send),
        in: aproxProofs,
        out: send,
        change: keep,
        createdAt: Date.now(),
        lastChangedAt: Date.now(),
        counts: { keysetId: keysetId, counts: getCount(currentCount, endCount) },
        state: TransactionStatus.PENDING,
        fees: getAmountForTokenSet(aproxProofs)-(getAmountForTokenSet(send)+getAmountForTokenSet(keep)),
    }

    await transactionsStore.addOrUpdate(transactionToAdd.id, transactionToAdd, 'id')
    toast.info('Ecash token created', {description: formatAmount(amount, options?.unit)})
    return { send, keep, txId: transactionToAdd.id }
}

export const checkProofs = async (proofs: Proof[], type: "pending"|"active"): Promise<{pending: Proof[], spent: Proof[], unspent: Proof[]}> => {
    const proofBuckets = separateProofsById(proofs)
    const pending: Proof[] = []
    const spent: Proof[] = []
    const unspent: Proof[] = []
    const enc = new TextEncoder()
    for (const pb of proofBuckets) {
        const mint = getMintForKeysetId(get(mints),pb.id)
        if (!mint) {
            //todo toast?
            continue
        }
        const cashuMint = new CashuMint(mint.url)
        const cashuWallet = new CashuWallet(cashuMint)
        const proofStates = await cashuWallet.checkProofsStates(pb.proofs)
        const unspentProofStateYs = proofStates.filter(ps=> ps.state===CheckStateEnum.UNSPENT).map(ps=> ps.Y)
        const pendingProofStateYs = proofStates.filter(ps=> ps.state===CheckStateEnum.PENDING).map(ps=> ps.Y)
        const spentProofStateYs = proofStates.filter(ps=> ps.state===CheckStateEnum.SPENT).map(ps=> ps.Y)
        const unspentKeysetProofs = pb.proofs.filter(p=> unspentProofStateYs.includes(hashToCurve(enc.encode(p.secret)).toHex(true)))
        const pendingKeysetProofs = pb.proofs.filter(p=> pendingProofStateYs.includes(hashToCurve(enc.encode(p.secret)).toHex(true)))
        const spentKeysetProofs = pb.proofs.filter(p=> spentProofStateYs.includes(hashToCurve(enc.encode(p.secret)).toHex(true)))
        if (type==='pending') {
            await proofsStore.addMany(unspentKeysetProofs)
            await spentProofsStore.addMany(spentKeysetProofs)
            await pendingProofsStore.removeMany([...unspentKeysetProofs,...spentKeysetProofs,...pendingKeysetProofs].map(p=> p.id),"id")
            await pendingProofsStore.addMany(pendingKeysetProofs)
        }
        else if (type==='active') {
            await spentProofsStore.addMany(spentKeysetProofs)
            await pendingProofsStore.addMany(pendingKeysetProofs)
            await proofsStore.removeMany([...unspentKeysetProofs,...spentKeysetProofs,...pendingKeysetProofs].map(p=> p.id),"id")
            await proofsStore.addMany(unspentKeysetProofs)
        }
        pending.push(...pendingKeysetProofs)
        spent.push(...spentKeysetProofs)
        unspent.push(...unspentKeysetProofs)
    }
    return {pending, spent, unspent}
}
 

const getCurrentCount = (ksId: string) => {
    const countStart = countsStore.getBy(ksId, 'keysetId')
    let currentCount = 0
    if (countStart) {
        currentCount = countStart.count + 1
    }
    return currentCount
}

const updateCount = async (ksId: string, endCount: number) => {
    await countsStore.addOrUpdate(ksId, { keysetId: ksId, count: endCount }, 'keysetId')
}

export const getFeeForProofs = async (proofs: Proof[]): Promise<number> => {
    if (proofs.length === 0) {
        return 0
    }
    const mint = getMintForKeysetId(get(mints), proofs[0].id)
    if (!mint) {
        throw new Error("cannot get fee for unknown mint");
    }
    const unit = getUnitForKeysetId(get(mints), proofs[0].id)
    const wallet = await getWalletWithUnit(get(mints), mint?.url, unit)

    return wallet.getFeesForProofs(proofs)
}

export const getMinMaxFeeForAmount = (amount: number, mint: Mint, unit: string) => {
    const keyset = mint.keysets.keysets.find(ks => ks.unit === unit)
    const keys = mint.keys.keysets.find(k => k.id === keyset?.id)


    const feeppk = keyset?.input_fee_ppk
    const denos = Object.keys(keys?.keys ?? {})
}

export const createCashuRequest = async (amount: number, mints?: string[], unit?: string, description?: string, singleUse?: boolean) => {
    const type = PaymentRequestTransportType.NOSTR
    const transport: PaymentRequestTransport[] = [{
        type,
        target: getNprofile(),
        tags: [["n", "17"]]
    }]
    const id = bytesToHex(randomBytes(8))
    const paymentRequest = new PaymentRequest(transport, id, amount, unit, mints ,description, singleUse)
    const storedPaymentRequest: StoredPaymentRequest = {
        createdAt: Date.now(),
        lastChangedAt: Date.now(),
        transport,
        amount,
        description,
        id,
        mints,
        singleUse,
        unit
    }
    await cashuRequestsStore.add(storedPaymentRequest)
    return paymentRequest
}