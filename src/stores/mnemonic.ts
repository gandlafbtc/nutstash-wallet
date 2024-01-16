import { browser } from '$app/environment';

import { get, writable } from 'svelte/store';
import { isEncrypted } from './settings';
import { encryptSeed } from '../actions/walletActions';
import { encryptedStorageSeed } from './encrypted';

const initialValue: string = browser ? window.localStorage.getItem('mnemonic') ?? '' : '';

const mnemonic = writable<string>(initialValue);

mnemonic.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (stringValue=='') {
				return
			}else{
				encryptedStorageSeed.set(await encryptSeed(stringValue)??'')
			}
		} else {
			window.localStorage.setItem('mnemonic', stringValue);
		}
	}
});

export { mnemonic };
