import { browser } from '$app/environment';

import { get, writable } from 'svelte/store';

const mnemonic = writable<string[]>([]);

const seed = writable<Uint8Array>();

export { mnemonic, seed };
