import { writable } from 'svelte/store';

import { randomBytes, bytesToHex, hexToBytes } from '@noble/hashes/utils';

import { browser } from '$app/environment';

const initialValueSting: string = browser
	? window.localStorage.getItem('key-iv') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const initialValue: string = initialValueSting;

const iv = writable<Uint8Array>(hexToBytes(initialValue));

iv.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('key-iv', bytesToHex(value));
	}
});

const initialValueStingSeed: string = browser
	? window.localStorage.getItem('key-iv-seed') ?? bytesToHex(randomBytes(16))
	: bytesToHex(randomBytes(16));

const initialValueSeed: string = initialValueStingSeed;

const seedIv = writable<Uint8Array>(hexToBytes(initialValueSeed));

seedIv.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('key-iv-seed', bytesToHex(value));
	}
});

export { iv, seedIv };

export let key = writable<CryptoKey | undefined>();
