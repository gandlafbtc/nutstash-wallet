import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { encryptedPendingTokensStore } from './encrypted';
import { isEncrypted } from './settings';
import { encryptPendingTokens } from '../actions/walletActions';

const initialValueSting: string = browser
	? window.localStorage.getItem('pending-tokens') ?? '[]'
	: '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const pendingTokens = writable<Array<Proof>>(initialValue);

pendingTokens.subscribe(async (value) => {
	if (browser) {
		let stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (!stringValue) {
				stringValue = '[]';
			}
			encryptedPendingTokensStore.set(await encryptPendingTokens(stringValue));
			window.localStorage.setItem('pending-tokens', '[]');
		} else {
			window.localStorage.setItem('pending-tokens', stringValue);
			window.localStorage.setItem('encrypted-pending-tokens', '');
		}
	}
});

export { pendingTokens };
