import { writable } from 'svelte/store';

export const scanresultStore = writable<string | undefined>();
