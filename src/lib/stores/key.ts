import { writable } from 'svelte/store';

import { randomBytes, bytesToHex, hexToBytes } from '@noble/hashes/utils';

import { browser } from '$app/environment';

const initialValue: string = browser
	? window.localStorage.getItem('tokens-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const iv = writable<Uint8Array>(hexToBytes(initialValue));

iv.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('tokens-key-iv', bytesToHex(value));
	}
});

const initialValueSpent: string = browser
	? window.localStorage.getItem('spent-tokens-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const ivSpent = writable<Uint8Array>(hexToBytes(initialValueSpent));

ivSpent.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('spent-tokens-key-iv', bytesToHex(value));
	}
});

const initialValuePending: string = browser
	? window.localStorage.getItem('pending-tokens-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const ivPending = writable<Uint8Array>(hexToBytes(initialValuePending));

ivPending.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('pending-tokens-key-iv', bytesToHex(value));
	}
});

const initialValueOffline: string = browser
	? window.localStorage.getItem('offline-tokens-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const ivOffline = writable<Uint8Array>(hexToBytes(initialValueOffline));

ivOffline.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('offline-tokens-key-iv', bytesToHex(value));
	}
});

const seedIVinitialValue: string = browser
	? window.localStorage.getItem('seed-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const seedIv = writable<Uint8Array>(hexToBytes(seedIVinitialValue));

seedIv.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('seed-key-iv', bytesToHex(value));
	}
});

const nostrIVinitialValue: string = browser
	? window.localStorage.getItem('nostr-key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const nostrKeysIv = writable<Uint8Array>(hexToBytes(nostrIVinitialValue));

nostrKeysIv.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nostr-key-iv', bytesToHex(value));
	}
});

export { iv, ivPending, ivSpent, ivOffline, seedIv, nostrKeysIv };

export let key = writable<CryptoKey | undefined>();
