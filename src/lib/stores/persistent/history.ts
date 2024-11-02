import { browser } from '$app/environment';
import type { HistoryItem } from '$lib/db/models/types';
import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('history') ?? '[]' : '[]';

const initialValue: Array<HistoryItem> = JSON.parse(initialValueSting);

const history = writable<Array<HistoryItem>>(initialValue);

history.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('history', JSON.stringify(value));
	}
});

export { history };
