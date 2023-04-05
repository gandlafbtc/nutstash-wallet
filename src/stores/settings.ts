import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue = browser ?  window.localStorage.getItem('setting-check-non-pending') ?? 'false':'false';
const initialValue2 =browser ?  window.localStorage.getItem('setting-check-pending') ?? 'false':'false';
const initialValue3 =browser ?  window.localStorage.getItem('setting-check-token-auto') ?? 'false':'false';

const checkNonPending = writable<boolean>(JSON.parse(initialValue));
const checkPending = writable<boolean>(JSON.parse(initialValue2));
const checkAutomatically = writable<boolean>(JSON.parse(initialValue3));

checkNonPending.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('setting-check-non-pending', JSON.stringify(value));
	}
});

checkPending.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('setting-check-pending', JSON.stringify(value));
	}
});

checkAutomatically.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('setting-check-token-auto', JSON.stringify(value));
	}
});

export { checkNonPending, checkAutomatically, checkPending };
