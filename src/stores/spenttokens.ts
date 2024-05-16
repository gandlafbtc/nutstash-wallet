import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';

const initialValueSting: string = browser
	? window.localStorage.getItem('spent-tokens') ?? '[]'
	: '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const spentTokens = writable<Array<Proof>>(initialValue);

spentTokens.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('spent-tokens', JSON.stringify(value));
	}
});

export { spentTokens };
