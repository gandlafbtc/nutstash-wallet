import { browser } from '$app/environment';

import { get, writable } from 'svelte/store';
import { isEncrypted } from './settings';
import { encryptSeed } from '../actions/walletActions';
import { encryptedSeedStore } from './encrypted';

const initialValue: string = browser ? window.localStorage.getItem('mnemonic') ?? '[]' : '[]';

const mnemonic = writable<string[]>(JSON.parse(initialValue));

mnemonic.subscribe(async (value) => {
	if (browser) {
		if (get(isEncrypted)) {
			if (!value) {
				return;
			}
			encryptedSeedStore.set(await encryptSeed(JSON.stringify(value)));
			window.localStorage.setItem('mnemonic', '[]');
		} else {
			window.localStorage.setItem('mnemonic', JSON.stringify(value));
			window.localStorage.setItem('encrypted-seed', '');
		}
	}
});

const seed = writable<Uint8Array>();

export { mnemonic, seed };
