import { browser } from '$app/environment';
import { ContextError, ensureError } from '$lib/helpers/errors';
import type { Mint } from '$lib/model/mint';
import { CashuMint, CashuWallet } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { seed } from './mnemonic';

const createMintsStore = () => {

	const initialMint: Array<Mint> = [];

	const initialValueSting: string = browser
		? window.localStorage.getItem('mints') ?? JSON.stringify(initialMint)
		: JSON.stringify(initialMint);

	const initialValue: Array<Mint> = JSON.parse(initialValueSting);
	const store = writable<Array<Mint>>(initialValue);

	const createMint = async (mintUrl: string) => {
		const { mint } = await loadMint(mintUrl)
		update(context => [mint, ...context]);
	}

	const updateMints = async (mintUrls: string[]) => {
		for (const mintUrl of mintUrls) {
            const { mint } = await loadMint(mintUrl)
            mints.updateOne(mint)
        };
	}

	const getByUrl = (mintUrl: string): Mint | undefined => {
		return get(store).find(m => m.mintURL === mintUrl);
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

	const getWalletWithUnit = (mintUrl: string, unit = 'sat') => {
		const mint = mints.getByUrl(mintUrl)
		if (!mint) {
			 throw new Error(`Mint ${mintUrl} not found`)
		}
		const keys = mint.keys.keysets.find(ks => ks.unit)
		const keysets = mint.keysets.keysets.filter(ks => ks.unit === unit)
		const wallet = new CashuWallet(new CashuMint(mintUrl), {mnemonicOrSeed: get(seed), mintInfo:mint.info, unit: unit, keys, keysets }) 
	 
	 return wallet;
 }

	const updateUrl = (mintUrl: string, newUrl: string) => {
		update(context => context.map(m => {
			if (m.mintURL === mintUrl) {
				m.mintURL = newUrl
			}
			return m;
		}));
	}

	const { update, subscribe, set } = store;

	return {
		subscribe,
		set,
		update,
		getByUrl,
		updateUrl,
		remove,
		updateOne,
		createMint,
		updateMints,
		getWalletWithUnit
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




const loadMint = async (mintUrl: string) => {
	try {
		const cashuMint = new CashuMint(mintUrl)
		const mintInfo = await cashuMint.getInfo()
		const mintAllKeysets = await cashuMint.getKeySets()
		const mintActiveKeys = await cashuMint.getKeys()
		const mint = {
			info: mintInfo,
			keys: mintActiveKeys,
			keysets: mintAllKeysets,
			mintURL: mintUrl,
		}

		return { mint }
	} catch (error) {
		const err = ensureError(error);
		throw new ContextError(`Could not load mint`, {
			cause: err,
			context: {
				mintURL: mintUrl,
			},
		});
	}
}