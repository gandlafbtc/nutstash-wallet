import { browser } from '$app/environment';
import type { Mint } from 'src/model/mint';

import { writable } from 'svelte/store';

 


const initialValueSting: string = browser ? window.localStorage.getItem('mints') ?? '[]': '[]'

const initialValue : Array<Mint> = JSON.parse(initialValueSting)

 

const mints  = writable<Array<Mint>>(initialValue);

 

mints.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('mints', JSON.stringify(value));
  }
});

 

export {mints};