import { browser } from '$app/environment';
import type { Proof } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('tokens') ?? '[]' : '[]';

const initialValue: Array<Proof> = JSON.parse(initialValueSting);

const token = writable<Array<Proof>>(initialValue);

token.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('tokens', JSON.stringify(value));
	}
});

export { token };
