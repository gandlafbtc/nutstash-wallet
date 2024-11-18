import { browser } from '$app/environment';
import { HDKey } from '@scure/bip32';

import { get, writable } from 'svelte/store';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { schnorr, secp256k1 } from '@noble/curves/secp256k1';
import { seed } from './mnemonic';
import { deriveBlindingFactor } from '@cashu/crypto/modules/client/NUT09';
import { SimplePool, type Relay } from 'nostr-tools';
import type { Message, NostrRelay } from '$lib/db/models/types';

const initialValueSting: string = browser
	? window.localStorage.getItem('use-nostr') ?? 'true'
	: 'true';

const initialValue: boolean = JSON.parse(initialValueSting);

const useNostr = writable<boolean>(initialValue);

useNostr.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('use-nostr', JSON.stringify(value));
	}
});

const initialValueExternalKeySting: string = browser
	? window.localStorage.getItem('use-external-nostr') ?? 'false'
	: 'false';

const initialValueExternalKey: boolean = JSON.parse(initialValueExternalKeySting);

const useExternalNostrKey = writable<boolean>(initialValueExternalKey);

useExternalNostrKey.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('use-external-nostr', JSON.stringify(value));
	}
});

const initialValueNostrKeysString: string = browser
	? window.localStorage.getItem('nostr-keys') ?? '[]'
	: '[]';

export type NostrKeys = {
	pub: string;
	priv: string;
};

const initialValueNostrKeys: NostrKeys[] = JSON.parse(initialValueNostrKeysString);

const nostrKeys = writable<NostrKeys[]>(initialValueNostrKeys);


const initialValueStingNostrMessages: string = browser
	? window.localStorage.getItem('nostr-messages') ?? '[]'
	: '[]';

const initialValueNostrMessage: Array<Message> = JSON.parse(initialValueStingNostrMessages);

const nostrMessages = writable<Array<Message>>(initialValueNostrMessage);

nostrMessages.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nostr-messages', JSON.stringify(value));
	}
});

const initialValueStingNostrRelays: string = browser
	? window.localStorage.getItem('nostr-relays') ??
		'[{"url": "wss://relay.damus.io","isActive":"true"}, {"url": "wss://nostr.einundzwanzig.space/","isActive":"true"}, {"url": "wss://relay.primal.net","isActive":"true"}]'
	: '[{"url": "wss://relay.damus.io","isActive":"true"}, {"url": "wss://nostr.einundzwanzig.space/","isActive":"true"}, {"url": "wss://relay.primal.net","isActive":"true"}]';

const initialValueNostrRelays: Array<NostrRelay> = JSON.parse(initialValueStingNostrRelays);





const nostrPool = writable<SimplePool>(new SimplePool());



export {
	useNostr,
	nostrMessages,
	nostrPool,
	useExternalNostrKey,
	nostrKeys,
};
