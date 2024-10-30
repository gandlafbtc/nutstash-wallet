import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { isEncrypted } from './settings';
import { encrypt } from '../actions/walletActions';
import { encryptedTokensStore } from './encrypted';

const initialValueSting: string = browser ? window.localStorage.getItem('tokens') ?? '[]' : '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const token = writable<Array<Proof>>(initialValue);

token.subscribe(async (value) => {
	if (browser) {
		let stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (!stringValue) {
				stringValue = '[]';
			}
			encryptedTokensStore.set(await encrypt(stringValue));
			window.localStorage.setItem('tokens', '[]');
		} else {
			window.localStorage.setItem('tokens', stringValue);
			window.localStorage.setItem('encrypted-tokens', '');
		}
	}
});

export { token };
