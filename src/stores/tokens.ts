import { browser } from '$app/environment';
import { PUBLIC_SELFHOSTED } from '$env/static/public';
import type { Proof } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { isSyncTokens, selfhostedSyncTokens } from './selfhosted';

const initialValueSting: string = browser ? window.localStorage.getItem('tokens') ?? '[]' : '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const token = writable<Array<Proof>>(initialValue);

token.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('tokens', stringValue);
		if (PUBLIC_SELFHOSTED && get(selfhostedSyncTokens)) {
			isSyncTokens.set(true);
			await fetch('/api/backup/tokens', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: stringValue
			});
			isSyncTokens.set(false);
		}
	}
});

export { token };
