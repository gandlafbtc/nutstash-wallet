import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { HistoryItem } from '../model/historyItem';
import type { HistoryData } from '../model/data/HistoryData';

const initialValueSting: string = browser ? window.localStorage.getItem('history') ?? '[]' : '[]';

const initialValue: Array<HistoryItem<HistoryData>> = JSON.parse(initialValueSting);

const history = writable<Array<HistoryItem<HistoryData>>>(initialValue);

history.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('history', JSON.stringify(value));
	}
});

export { history };
