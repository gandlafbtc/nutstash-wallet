import { browser } from '$app/environment';

import { writable } from 'svelte/store';
import type { HistoryItem } from 'src/model/historyItem';

const initialValueSting: string = browser ? window.localStorage.getItem('history') ?? '[]': '[]'

const initialValue : Array<HistoryItem> = JSON.parse(initialValueSting)

const history  = writable<Array<HistoryItem>>(initialValue);

history.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('history', JSON.stringify(value));
  }
});

 

export {history};