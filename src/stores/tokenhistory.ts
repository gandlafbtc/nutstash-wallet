import { browser } from '$app/environment';
import type { Token } from 'src/model/token';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('tokenhistory') ?? '[]': '[]'

const initialValue : Array<string> = JSON.parse(initialValueSting)

const tokenHistory  = writable<Array<string>>(initialValue);

tokenHistory.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('tokenhistory', JSON.stringify(value));
  }
});

 

export {tokenHistory};