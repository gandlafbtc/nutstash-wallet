import { browser } from '$app/environment';
import type { Token } from 'src/model/token';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('pending-tokens') ?? '[]': '[]'

const initialValue : Array<Token> = JSON.parse(initialValueSting)

const pendingTokens  = writable<Array<Token>>(initialValue);

pendingTokens.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('pending-tokens', JSON.stringify(value));
  }
});

export {pendingTokens};