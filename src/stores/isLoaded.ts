import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue: string = browser ? window.localStorage.getItem('is-loaded') ?? '' : '';


const isLoaded = writable(initialValue);

export { isLoaded };
