import { browser } from '$app/environment';
import type { RelayPool } from 'nostr-relaypool';
import type { NostrMessage } from '../model/nostrMessage';

import { writable } from 'svelte/store';
import type { NostrRelay } from '../model/relay';

const initialValueSting: string = browser ? window.localStorage.getItem('use-nostr') ?? 'false': 'false'

const initialValue : boolean = JSON.parse(initialValueSting)

const useNostr  = writable<boolean>(initialValue);

useNostr.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('use-nostr', JSON.stringify(value));
  }
});


const initialValueExternalKeySting: string = browser ? window.localStorage.getItem('use-external-nostr') ?? 'true': 'true'

const initialValueExternalKey : boolean = JSON.parse(initialValueExternalKeySting)

const useExternalNostrKey  = writable<boolean>(initialValueExternalKey);

useExternalNostrKey.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('use-external-nostr', JSON.stringify(value));
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

const initialValueStingNostrRelays: string = browser ? window.localStorage.getItem('nostr-relays') ?? '[{"url": "wss://nostr-pub.wellorder.net","isActive":"true"}]': '[{"url": "wss://nostr-pub.wellorder.net","isActive":"true"}]'

const initialValueNostrRelays : Array<NostrRelay> = JSON.parse(initialValueStingNostrRelays)

const nostrRelays  = writable< Array<NostrRelay>>(initialValueNostrRelays);

nostrRelays.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('nostr-relays', JSON.stringify(value));
  }
});

const nostrPool  = writable<RelayPool>()

export {useNostr, nostrPrivKey, nostrMessages, nostrPubKey, nostrPool, nostrRelays, useExternalNostrKey};