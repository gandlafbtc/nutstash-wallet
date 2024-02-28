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
const initialValueStingSeed: string = browser
	? window.localStorage.getItem('encrypted-seed') ?? ''
	: '';

const initialValueSeed: string = initialValueStingSeed;

const encryptedStorageSeed = writable<string>(initialValueSeed);

encryptedStorageSeed.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-seed', value);
	}
});

export { encryptedStorage, encryptedStorageSeed };
