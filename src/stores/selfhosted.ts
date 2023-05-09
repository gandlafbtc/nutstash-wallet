import { browser } from '$app/environment';
import { PUBLIC_SELFHOSTED } from '$env/static/public';

import { writable } from 'svelte/store';

const initialValue = browser
	? window.localStorage.getItem('selfhosted-sync-tokens') ?? 'false'
	: 'false';

const isSyncTokens = writable<boolean>(false);
const isSyncMints = writable<boolean>(false);

const selfhostedSyncTokens = writable<boolean>(JSON.parse(initialValue));

selfhostedSyncTokens.subscribe(async (value) => {
	if (browser) {
		window.localStorage.setItem('selfhosted-sync-tokens', JSON.stringify(value));
	}
});

export { selfhostedSyncTokens, isSyncMints, isSyncTokens };
