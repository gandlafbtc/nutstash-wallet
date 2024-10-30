import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';
import { encrypt } from 'nostr-tools/nip04';

import { get, writable } from 'svelte/store';
import { encryptedSpentTokensStore } from './encrypted';
import { isEncrypted } from './settings';
import { encryptSpentTokens } from '../actions/walletActions';

const initialValueSting: string = browser
	? window.localStorage.getItem('spent-tokens') ?? '[]'
	: '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const spentTokens = writable<Array<Proof>>(initialValue);

spentTokens.subscribe(async (value) => {
	if (browser) {
		let stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (!stringValue) {
				stringValue = '[]';
			}
			encryptedSpentTokensStore.set(await encryptSpentTokens(stringValue));
			window.localStorage.setItem('spent-tokens', '[]');
		} else {
			window.localStorage.setItem('spent-tokens', stringValue);
			window.localStorage.setItem('encrypted-spent-tokens', '');
		}
	}
});

export { spentTokens };
