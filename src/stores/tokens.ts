import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('tokens') ?? '[]' : '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const token = writable<Array<Proof>>(initialValue);

token.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('tokens', stringValue);
	}
});

export { token };
