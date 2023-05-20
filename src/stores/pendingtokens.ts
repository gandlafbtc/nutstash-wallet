import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';

const initialValueSting: string = browser
	? window.localStorage.getItem('pending-tokens') ?? '[]'
	: '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const pendingTokens = writable<Array<Proof>>(initialValue);

pendingTokens.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('pending-tokens', JSON.stringify(value));
	}
});

export { pendingTokens };
