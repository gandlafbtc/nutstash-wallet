import { browser } from '$app/environment';
import type { RelayPool } from 'nostr-relaypool';
import type { NostrMessage } from '../model/nostrMessage';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('use-nostr') ?? 'false': 'false'

const initialValue : boolean = JSON.parse(initialValueSting)

const useNostr  = writable<boolean>(initialValue);

useNostr.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('use-nostr', JSON.stringify(value));
  }
});


const initialValuePrivKeySting: string = browser ? window.localStorage.getItem('nostr-privkey') ?? '': ''

const nostrPrivKey  = writable<string>(initialValuePrivKeySting);

nostrPrivKey.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('nostr-privkey', value);
  }
});

const initialValuePubKeySting: string = browser ? window.localStorage.getItem('nostr-pubkey') ?? '': ''

const nostrPubKey  = writable<string>(initialValuePubKeySting);

nostrPubKey.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('nostr-pubkey', value);
  }
});


const initialValueStingNostrMessages: string = browser ? window.localStorage.getItem('nostr-messages') ?? '[]': '[]'

const initialValueNostrMessage : Array<NostrMessage>=JSON.parse(initialValueStingNostrMessages)

const nostrMessages  = writable<Array<NostrMessage>>(initialValueNostrMessage);

nostrMessages.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('nostr-messages', JSON.stringify(value));
  }
});

const initialValueStingNostrRelays: string = browser ? window.localStorage.getItem('nostr-relays') ?? '["wss://relay.nostropolis.xyz/websocket"]': '["wss://relay.nostropolis.xyz/websocket"]'

const initialValueNostrRelays : Array<string> = JSON.parse(initialValueStingNostrRelays)

const nostrRelays  = writable< Array<string>>(initialValueNostrRelays);

nostrRelays.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('nostr-relays', JSON.stringify(value));
  }
});

const nostrPool  = writable<RelayPool>()

export {useNostr, nostrPrivKey, nostrMessages, nostrPubKey, nostrPool, nostrRelays};