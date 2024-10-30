import { browser } from '$app/environment';
import type { Mint } from '$lib/model/mint';

import { writable } from 'svelte/store';

const createMintsStore = () => {

	const initialMint: Array<Mint> = [];

	const initialValueSting: string = browser
		? window.localStorage.getItem('mints') ?? JSON.stringify(initialMint)
		: JSON.stringify(initialMint);

	const initialValue: Array<Mint> = JSON.parse(initialValueSting);

	const add = (mint: Mint) => {
		update(context => [mint, ...context]);
	}

	const remove = (mintUrl: string) => {
		update(context => context.filter(m => m.mintURL !== mintUrl));
	}

	const updateOne = (mint: Mint) => {
		update(context => context.map(m => {
			if (m.mintURL === mint.mintURL) {
				return mint;
			}
			return m;
		}));
	}

	const updateUrl = (mintUrl: string, newUrl: string) => {
		update(context => context.map(m => {
			if (m.mintURL === mintUrl) {
				m.mintURL = newUrl
			}
			return m;
		}));
	}
	const store = writable<Array<Mint>>(initialValue);

	const { update, subscribe, set } = store;

	return {
		subscribe,
		set,
		update,
		add,
		updateUrl,
		remove,
		updateOne
	};
}

const mints = createMintsStore()

mints.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('mints', stringValue);
	}
});

const initialSelctedMints: Array<string> = [];

const initialSelctedMintsString: string = browser
	? window.localStorage.getItem('selected-mints') ?? JSON.stringify(initialSelctedMints)
	: JSON.stringify(initialSelctedMints);

const initialValueSelected: Array<string> = JSON.parse(initialSelctedMintsString);

const selectedMints = writable<Array<string>>(initialValueSelected);

selectedMints.subscribe(async (value) => {
	if (browser) {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('selected-mints', stringValue);
	}
});

export { mints, selectedMints };
