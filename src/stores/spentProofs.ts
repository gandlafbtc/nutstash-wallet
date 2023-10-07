import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('spent-tokens') ?? '[]' : '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const spent = writable<Array<Proof>>(initialValue);

spent.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('spent-tokens', stringValue);
	}
});

export { spent };
