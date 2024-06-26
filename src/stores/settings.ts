import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue = browser
	? window.localStorage.getItem('setting-check-non-pending') ?? 'false'
	: 'false';
const initialValue2 = browser
	? window.localStorage.getItem('setting-check-pending') ?? 'true'
	: 'true';
const initialValue3 = browser
	? window.localStorage.getItem('setting-check-token-auto') ?? 'false'
	: 'false';
const initialValue4 = browser
	? window.localStorage.getItem('setting-is-encrypted') ?? 'undefined'
	: 'undefined';
const initialValue5 = browser ? window.localStorage.getItem('is-restoring') ?? 'false' : 'false';

const checkNonPending = writable<boolean>(JSON.parse(initialValue));
const checkPending = writable<boolean>(JSON.parse(initialValue2));
const checkAutomatically = writable<boolean>(JSON.parse(initialValue3));
const isEncrypted = writable<boolean | undefined>(
	initialValue4 === 'undefined' ? undefined : initialValue4 === 'true' ? true : false
);
const isRestoring = writable<boolean>(JSON.parse(initialValue5));

isRestoring.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('is-restoring', JSON.stringify(value));
	}
});

const unit = writable<string>('sat');

unit.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('unit', value);
	}
});

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

isEncrypted.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('setting-is-encrypted', JSON.stringify(value));
	}
});

export { checkNonPending, checkAutomatically, checkPending, isEncrypted, isRestoring, unit };
