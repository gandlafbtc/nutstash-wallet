import { keysStore } from "$lib/stores/persistent/keys";
import { nostrPool } from "$lib/stores/persistent/nostr";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { SimplePool, getPublicKey, kinds, type Event, type EventTemplate, getEventHash, type UnsignedEvent, nip44, generateSecretKey, type Filter, type NostrEvent, nip19 } from "nostr-tools";
import { wrapEvent, unwrapManyEvents } from "nostr-tools/nip17";
import { encrypt, decrypt } from "nostr-tools/nip44";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";

import { get } from "svelte/store";
import { messagesStore } from "$lib/stores/persistent/contacts copy";
import type { Message } from "$lib/db/models/types";
import type { NPub, ProfilePointer } from "nostr-tools/nip19";

export const connectNostrRelays = async () => {
  await subscribeToNip17DirectMessages()
}

export const sendNip17DirectMessageToNprofile = async  (nprofile: string,  message: string) => {
  const result = nip19.decode(nprofile);
  const pubkey: string = (result.data as ProfilePointer).pubkey;
  const relays: string[] | undefined = (result.data as ProfilePointer).relays;
  await sendNip17DirectMessage(pubkey, message, relays)
}

export const sendNip17DirectMessageToNpub = async  (npub: string, message: string) => {
  const pubkey = nip19.decode(npub).data as string;
  console.log()
  await sendNip17DirectMessage(pubkey, message, undefined)
}


const sendNip17DirectMessage = async function (receiverPubkey: string, message: string, relays: string[] | undefined) {
  const hexPrivKey = get(keysStore)[get(keysStore).length - 1].privateKey
  const seedSignerSecKey = hexToBytes(hexPrivKey)
  const signerPubKey = keysStore.getBy(hexPrivKey, 'privateKey')?.publicKey.slice(2)
  if (!signerPubKey) {
    throw new Error("No public key found");
  }
  const randomPrivateKey = generateSecretKey();
  const randomPublicKey = getPublicKey(randomPrivateKey);
  const ndk = new NDK({ explicitRelayUrls: ['wss://relay.damus.io'], signer: new NDKPrivateKeySigner(bytesToHex(randomPrivateKey)) });

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
    await get(nostrPool).publish(['wss://relay.damus.io'], nostrEventReceiver)
    await get(nostrPool).publish(['wss://relay.damus.io'], NostrEventSender)
    console.log('events published')

  } catch (e) {
    console.error(e);
  }
}
const subscribeToNip17DirectMessages = async function () {
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
  get(nostrPool).subscribeMany(
    ['wss://relay.damus.io']
    , [filter],
    {
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
          const message: Message = {
            ...dmEvent,
            isRead: false,
            wrapId: wrapEvent.id
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
