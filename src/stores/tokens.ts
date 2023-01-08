import { browser } from '$app/environment';
import type { Token } from 'src/model/token';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('tokens') ?? '[]': '[]'

const initialValue : Array<Token> = JSON.parse(initialValueSting)

const token  = writable<Array<Token>>(initialValue);

token.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('tokens', JSON.stringify(value));
  }
});

 

export {token};