import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue: string = browser ? window.localStorage.getItem('mnemonic') ?? '' : '';

const mnemonic = writable<string>(initialValue);

mnemonic.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('mnemonic', value);
	}
});

export { mnemonic };
