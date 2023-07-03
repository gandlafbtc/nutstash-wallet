import { browser } from '$app/environment';
import { PUBLIC_SELFHOSTED } from '$env/static/public';
import type { Mint } from '../../src/model/mint';

import { get, writable } from 'svelte/store';
import { isSyncMints, selfhostedSyncTokens } from './selfhosted';

const initialMint: Array<Mint> = [];

const initialValueSting: string = browser
	? window.localStorage.getItem('mints') ?? JSON.stringify(initialMint)
	: JSON.stringify(initialMint);

const initialValue: Array<Mint> = JSON.parse(initialValueSting);

const mints = writable<Array<Mint>>(initialValue);

mints.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('mints', stringValue);
		if (PUBLIC_SELFHOSTED && get(selfhostedSyncTokens)) {
			isSyncMints.set(true);
			await fetch('/api/backup/mints', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: stringValue
			});
			isSyncMints.set(false);
		}
	}
});

export { mints };
