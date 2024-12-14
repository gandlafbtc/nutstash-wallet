import { keysStore } from "$lib/stores/persistent/keys";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { finalizeEvent, getPublicKey, kinds, type Event, getEventHash, type UnsignedEvent, nip44, generateSecretKey, type Filter, type NostrEvent, nip19, type EventTemplate } from "nostr-tools";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";

import { get } from "svelte/store";
import { messagesStore } from "$lib/stores/persistent/message";
import { TokenCheckMode, type Message } from "$lib/db/models/types";
import type { NPub, ProfilePointer } from "nostr-tools/nip19";
import { relaysStore } from "$lib/stores/persistent/relays";
import { toast } from "svelte-sonner";
import { nostrPool } from "$lib/stores/session/nostr";
import { discoveredMints } from "$lib/stores/session/mintdiscover";
import { wordlist } from "@scure/bip39/wordlists/english";
import { discoveredContacts } from "$lib/stores/session/contactdiscover";
import { getDecodedToken, type Proof, type Token } from "@cashu/cashu-ts";
import { ensureError } from "$lib/helpers/errors";
import { settings } from "$lib/stores/persistent/settings";
import { mints } from "$lib/stores/persistent/mints";
import { receiveEcash } from "./actions";

export const createAlias = () => {
  const wordlistLength = wordlist.length
  return wordlist[Math.floor(Math.random() * wordlistLength)] + ' ' + wordlist[Math.floor(Math.random() * wordlistLength)]
}

export const getNprofile = () => {
  const profilePointer: ProfilePointer = {
    pubkey: get(keysStore)[get(keysStore).length - 1].publicKey.slice(2),
    relays: get(relaysStore).filter(r => r.isOn).map(r => r.url)
  }
  return nip19.nprofileEncode(profilePointer)
}

export const connectNostrRelays = async () => {
  await subscribeToNip17DirectMessages()
}

export const reconnect = async () => {

  get(nostrPool).close(get(relaysStore).filter(r => r.hasConnection).map(r => r.url))
  toast.promise(subscribeToNip17DirectMessages(), {
    loading: 'Reconnecting nostr relays...',
    success: () => {
      return 'Reconnected!'
    },
    error: (data) => {
      return 'Failed to reconnect'
    }
  })
}

export const discoverMints = async () => {
  discoveredMints.set([])
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const filter: Filter = { kinds: [38000], limit: 2000 };
  get(nostrPool).subscribeMany(activeRelays, [filter], {
    onevent: (event: Event) => {
      const uTag = event.tags.find(t => t[0] === 'u')
      const kTag = event.tags.find(t => t[0] === 'k')
      if (!kTag || !uTag) {
        return
      }

      if (kTag[1] != "38172") {
        return
      }
      const mintUrl = uTag[1]
      discoveredMints.add(mintUrl)
    }
  })
}

export const discoverContacts = async (npub: string) => {
  discoveredContacts.set([])
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const filter: Filter = { kinds: [3], limit: 1000, authors: [nip19.decode(npub).data as string] };
  const sub = get(nostrPool).subscribeMany(activeRelays, [filter], {
    onevent: (event: Event) => {
      console.log(event)
      const contacts = []
      for (const tag of event.tags) {
        if (tag[0] !== 'p') {
          continue
        }
        contacts.push(tag[1])
      }
      sub.close()
      discoverContactsDetails(contacts)
    },

  })
}

const discoverContactsDetails = async (contacts: string[]) => {
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const filter: Filter = { kinds: [0], limit: 1000, authors: contacts };
  const sub = get(nostrPool).subscribeMany(activeRelays, [filter], {
    onevent: (event: Event) => {
      const content = JSON.parse(event.content)
      discoveredContacts.add(nip19.npubEncode(event.pubkey), content.name, content.picture)
    },

  })
}

export const sendNip17DirectMessageToNprofile = async (nprofile: string, message: string) => {
  const result = nip19.decode(nprofile);
  const pubkey: string = (result.data as ProfilePointer).pubkey;
  const relays: string[] | undefined = (result.data as ProfilePointer).relays;
  await sendNip17DirectMessage(pubkey, message, relays)
}

export const sendNip17DirectMessageToNpub = async (npub: string, message: string) => {
  const pubkey = nip19.decode(npub).data as string;
  console.log()
  await sendNip17DirectMessage(pubkey, message, undefined)
}

export const publishEvent = async (content: string, tags: string[][]) => {
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const event: EventTemplate = {
    content,
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags,
  }
  try {
    const signedEvent = finalizeEvent(event, hexToBytes(get(keysStore)[0].privateKey))
    await get(nostrPool).publish(activeRelays, signedEvent)
    console.log(signedEvent.id)
  } catch (error) {
    const err = ensureError(error)
    console.error(err);
    toast.error(err.message);
  }
}


const sendNip17DirectMessage = async function (receiverPubkey: string, message: string, relays?: string[]) {
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const hexPrivKey = get(keysStore)[get(keysStore).length - 1].privateKey
  const seedSignerSecKey = hexToBytes(hexPrivKey)
  const signerPubKey = keysStore.getBy(hexPrivKey, 'privateKey')?.publicKey.slice(2)
  if (!signerPubKey) {
    throw new Error("No public key found");
  }
  const randomPrivateKey = generateSecretKey();
  const randomPublicKey = getPublicKey(randomPrivateKey);
  const ndk = new NDK({ explicitRelayUrls: [...activeRelays, ...relays ?? []], signer: new NDKPrivateKeySigner(bytesToHex(randomPrivateKey)) });

  const dmEvent = new NDKEvent();
  dmEvent.kind = 14;
  dmEvent.content = message;
  dmEvent.tags = [['p', receiverPubkey]];
  dmEvent.created_at = Math.floor(Date.now() / 1000);
  dmEvent.pubkey = signerPubKey
  dmEvent.id = dmEvent.getEventHash();
  const dmEventString = JSON.stringify(await dmEvent.toNostrEvent());

  const sealEventReceiver = new NDKEvent(ndk);
  sealEventReceiver.kind = 13;
  sealEventReceiver.content = nip44.v2.encrypt(dmEventString, nip44.v2.utils.getConversationKey(seedSignerSecKey, receiverPubkey));
  sealEventReceiver.created_at = randomTimeUpTo2DaysInThePast();
  sealEventReceiver.pubkey = signerPubKey;
  sealEventReceiver.id = sealEventReceiver.getEventHash();
  sealEventReceiver.sig = await sealEventReceiver.sign();
  const sealEventString = JSON.stringify(await sealEventReceiver.toNostrEvent());

  const sealEventSender = new NDKEvent(ndk);
  sealEventSender.kind = 13;
  sealEventSender.content = nip44.v2.encrypt(dmEventString, nip44.v2.utils.getConversationKey(seedSignerSecKey, signerPubKey));
  sealEventSender.created_at = randomTimeUpTo2DaysInThePast();
  sealEventSender.pubkey = signerPubKey;
  sealEventSender.id = sealEventSender.getEventHash();
  sealEventSender.sig = await sealEventSender.sign();
  const sealEventSenderString = JSON.stringify(await sealEventSender.toNostrEvent());

  const wrapEventReceiver = new NDKEvent(ndk);
  wrapEventReceiver.kind = 1059;
  wrapEventReceiver.tags = [['p', receiverPubkey]];
  wrapEventReceiver.content = nip44.v2.encrypt(sealEventString, nip44.v2.utils.getConversationKey(randomPrivateKey, receiverPubkey));
  wrapEventReceiver.created_at = randomTimeUpTo2DaysInThePast();
  wrapEventReceiver.pubkey = randomPublicKey;
  wrapEventReceiver.id = wrapEventReceiver.getEventHash();
  wrapEventReceiver.sig = await wrapEventReceiver.sign();

  const wrapEventSender = new NDKEvent(ndk);
  wrapEventSender.kind = 1059;
  wrapEventSender.tags = [['p', signerPubKey]];
  wrapEventSender.content = nip44.v2.encrypt(sealEventSenderString, nip44.v2.utils.getConversationKey(randomPrivateKey, signerPubKey));
  wrapEventSender.created_at = randomTimeUpTo2DaysInThePast();
  wrapEventSender.pubkey = randomPublicKey;
  wrapEventSender.id = wrapEventSender.getEventHash();
  wrapEventSender.sig = await wrapEventSender.sign();

  const nostrEventReceiver: Event = {
    content: wrapEventReceiver.content,
    created_at: wrapEventReceiver.created_at,
    kind: wrapEventReceiver.kind,
    pubkey: wrapEventReceiver.pubkey,
    sig: wrapEventReceiver.sig,
    tags: wrapEventReceiver.tags,
    id: wrapEventReceiver.id
  }

  const NostrEventSender: Event = {
    content: wrapEventSender.content,
    created_at: wrapEventSender.created_at,
    kind: wrapEventSender.kind,
    pubkey: wrapEventSender.pubkey,
    sig: wrapEventSender.sig,
    tags: wrapEventSender.tags,
    id: wrapEventSender.id
  }

  try {
    console.log('publishing events...')
    await get(nostrPool).publish(activeRelays, nostrEventReceiver)
    await get(nostrPool).publish(activeRelays, NostrEventSender)
    console.log('events published')

  } catch (e) {
    const err = ensureError(e)
    console.error(err);
    toast.error(err.message);
  }
}
const subscribeToNip17DirectMessages = async function () {
  const activeRelays = get(relaysStore).filter(r => r.isOn).map(r => r.url);
  const secKeyHex = get(keysStore)[get(keysStore).length - 1].privateKey
  const seedSignerSecKey = hexToBytes(secKeyHex)
  const pubkeyHex = keysStore.getBy(secKeyHex, 'privateKey')?.publicKey.slice(2)
  if (!pubkeyHex) {
    throw new Error("No public key found");
  }
  let lastEventTimestamp = get(messagesStore).reduce((max, curr) => { return curr.created_at > max ? curr.created_at : max }, 1731900000)
  const filter: Filter = {
    kinds: [kinds.GiftWrap],
    limit: 10,
    since: lastEventTimestamp - 172800,
    '#p': [pubkeyHex]
  };

  console.log('subscribing to NIP-17 direct messages')

  relaysStore.update((context) => {
    context.forEach(e => {
      if (activeRelays.includes(e.url)) {
        e.hasConnection = true
      }
      else {
        e.hasConnection = false
      }
    })
    return context
  }
  )

  get(nostrPool).subscribeMany(
    activeRelays
    , [filter],
    {
      onclose: () => {
        console.log('closed pool')
      },

      onevent: (wrapEvent: Event) => {
        try {

          if (get(messagesStore).find(m => m.wrapId === wrapEvent.id)) {
            console.log(`### Already seen NIP-17 event ${wrapEvent.id}`);
            return
          }
          console.log('received NIP-17 event');
          const wappedContent = nip44.v2.decrypt(wrapEvent.content, nip44.v2.utils.getConversationKey(seedSignerSecKey, wrapEvent.pubkey))
          const sealEvent = JSON.parse(wappedContent) as NostrEvent;
          const dmEventString = nip44.v2.decrypt(sealEvent.content, nip44.v2.utils.getConversationKey(seedSignerSecKey, sealEvent.pubkey));
          const dmEvent = JSON.parse(dmEventString) as Event;
          let token: Token | undefined = undefined
          if (dmEvent.content.startsWith("{")) {
            try {
              const decoded = JSON.parse(dmEvent.content) as {
                id?: string;
                memo?: string;
                mint: string;
                unit: string;
                proofs: Proof[];
              };
              if (decoded.proofs.length) {
                token = {
                  mint: decoded.mint,
                  proofs: decoded.proofs,
                  memo: decoded.memo,
                  unit: decoded.unit
                }
              }
            } catch (error) {
              //not a token
            }
          }
          if (dmEvent.content.startsWith("cashu")) {
            try {

              token = getDecodedToken(dmEvent.content)

            } catch (error) {
              //not a token
            }
          }

          if (token && get(settings)[0].tokens.autoReceive && get(mints).find((m)=> m.url === token.mint)) {
            receiveEcash(token)
          }

          const message: Message = {
            ...dmEvent,
            isRead: false,
            wrapId: wrapEvent.id,
            isToken: token?true:false
          }
          console.log(dmEvent.content)
          messagesStore.addOrUpdate(wrapEvent.id, message, 'wrapId')
          lastEventTimestamp = Math.floor(Date.now() / 1000);
        } catch (error) {
          console.log(error)
        }
      }
    }
  );
}

const randomTimeUpTo2DaysInThePast = () => {
  return Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 172800);
}
