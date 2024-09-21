import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { encryptedOfflineTokensStore } from './encrypted';
import { isEncrypted } from './settings';
import { encryptOfflineTokens } from '../actions/walletActions';

const initialValueSting: string = browser
	? window.localStorage.getItem('offline-tokens') ?? '[]'
	: '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const offlineTokens = writable<Array<Proof>>(initialValue);

offlineTokens.subscribe(async (value) => {
	if (browser) {
		let stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (!stringValue) {
				stringValue = '[]';
			}
			encryptedOfflineTokensStore.set(await encryptOfflineTokens(stringValue));
			window.localStorage.setItem('offline-tokens', '[]');
		} else {
			window.localStorage.setItem('offline-tokens', stringValue);
			window.localStorage.setItem('encrypted-offline-tokens', '');
		}
	}
});

export { offlineTokens };
