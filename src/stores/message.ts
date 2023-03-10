import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueSting: string = browser
	? window.localStorage.getItem('message') ??
	  'Before using nutstash, please make sure you understand the risks.'
	: '';

const initialValue: string = initialValueSting;

const message = writable<string>(initialValue);

message.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('message', value);
	}
});

export { message };
