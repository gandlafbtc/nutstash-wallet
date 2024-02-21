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
			if (value=='') {
				return
			}else{
				encryptedStorageSeed.set(await encryptSeed(value)??"")
			}
		} else {
			window.localStorage.setItem('mnemonic', value);
		}
	}
});

export { mnemonic };
