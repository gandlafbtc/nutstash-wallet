import { browser } from '$app/environment';
import type { Mint } from '../../src/model/mint';

import {  writable } from 'svelte/store';

const initialMint: Array<Mint> = [];

const initialValueSting: string = browser
	? window.localStorage.getItem('mints') ?? JSON.stringify(initialMint)
	: JSON.stringify(initialMint);

const initialValue: Array<Mint> = JSON.parse(initialValueSting);

const mints = writable<Array<Mint>>(initialValue);

mints.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('mints', stringValue);
	}
});

export { mints };
