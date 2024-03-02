import { browser } from '$app/environment';

import { get, writable } from 'svelte/store';
import { isEncrypted } from './settings';
import { encryptSeed } from '../actions/walletActions';
import { encryptedStorageSeed } from './encrypted';

const initialValue: string = browser ? window.localStorage.getItem('mnemonic') ?? '' : '';

const mnemonic = writable<string>(initialValue);

mnemonic.subscribe(async (value) => {
	if (browser) {
		if (get(isEncrypted)) {
			if (!value) {
				value=''
			} 
				encryptedStorageSeed.set(await encryptSeed(value));
				window.localStorage.setItem('mnemonic', '');
			
		} else {
			window.localStorage.setItem('mnemonic', value);
			window.localStorage.setItem('encrypted-seed', '');
		}
	}
});

const seed = writable<Uint8Array>();

export { mnemonic, seed };
