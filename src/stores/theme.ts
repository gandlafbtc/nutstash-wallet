import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('theme') ?? 'dark' : 'dark';

const initialValue: string = initialValueSting;

const theme = writable<string>(initialValue);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value);
	}
});

export { theme };
