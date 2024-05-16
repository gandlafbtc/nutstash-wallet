import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueSting: string = browser
	? window.localStorage.getItem('isOnBoarded') ?? 'false'
	: 'false';

const initialValue: boolean = JSON.parse(initialValueSting);

const isOnboarded = writable<boolean>(initialValue);

isOnboarded.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('isOnBoarded', JSON.stringify(value));
	}
});

export { isOnboarded };
