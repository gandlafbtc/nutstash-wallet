import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue = window.localStorage.getItem('nutstash.unit') ?? 'sat';


export const unit = writable<string>(initialValue);

unit.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nutstash.unit', value);
	}
});



const initialValue5 = window.localStorage.getItem('is-restoring') ?? 'false';

