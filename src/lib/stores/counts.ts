import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('counts') ?? '[]' : '[]';

const initialValue: Array<{ keysetId: string; count: number }> = JSON.parse(initialValueSting);

const counts = writable<Array<{ keysetId: string; count: number }>>(initialValue);

counts.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('counts', JSON.stringify(value));
	}
});

export { counts };
