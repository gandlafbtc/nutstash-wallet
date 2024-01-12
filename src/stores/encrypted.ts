import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('encrypted') ?? '' : '';

const initialValue: string = initialValueSting;

const encryptedStorage = writable<string>(initialValue);

encryptedStorage.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted', value);
	}
});

export { encryptedStorage };
