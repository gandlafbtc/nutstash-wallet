import { browser } from '$app/environment';
import { ContextError, ensureError } from '$lib/helpers/errors';
import { CashuMint, CashuWallet } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { seed } from './mnemonic';
import type { Mint } from '$lib/db/models/types';
import { DB } from '$lib/db/db';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions } from './helper/storeHelper';
import { selectedMints } from '../local/selectedMints';
import { getHostFromUrl } from '$lib/util/utils';


const encryptionHelper = await createEncryptionHelper<Mint>('encrypted-mints')

export const createMintsStore = async (encryptionHelper: EncryptionHelper<Mint[]>) => {
	const store = writable<Mint[]>([]);
	const { update, set, subscribe } = store;
	const { addOrUpdate, clear, init, reEncrypt, remove, reset, getAllBy, getBy } = createDefaultStoreFunctions(encryptionHelper, store);


	const fetchMint = async (url: string) => {
		const mint = await loadMint(url)
		addOrUpdate(url, mint, 'url')
	}



	const getById = (mintUrl: string): Mint | undefined => {
		return getBy(mintUrl, 'url');
	}

	const getByHost = (host: string): Mint | undefined => {
		return get(store).find((m)=> host === getHostFromUrl(m.url));
	}


	const getWalletWithUnit = (mintUrl: string, unit = 'sat') => {
		const mint = getById(mintUrl)
		if (!mint) {
			throw new Error(`Mint ${mintUrl} not found`)
		}
		const keys = mint.keys.keysets.find(ks => ks.unit)
		const keysets = mint.keysets.keysets.filter(ks => ks.unit === unit)
		const wallet = new CashuWallet(new CashuMint(mintUrl), { mnemonicOrSeed: get(seed), mintInfo: mint.info, unit: unit, keys, keysets })

		return wallet;
	}

	return {
		subscribe,
		set,
		reset,
		update,
		getByUrl:
		getById,
		remove,
		getWalletWithUnit,
		addOrUpdate,
		init,
		clear,
		reEncrypt,
		fetchMint,
		getByHost
	};
}

export const mints = await createMintsStore(encryptionHelper)

mints.subscribe((mints)=> {
	const urls = mints.map(m=> m.url)
	
	selectedMints.set(urls)
})

const loadMint = async (mintUrl: string): Promise<Mint> => {
	try {
		const cashuMint = new CashuMint(mintUrl)
		const mintInfo = await cashuMint.getInfo()
		const mintAllKeysets = await cashuMint.getKeySets()
		const mintActiveKeys = await cashuMint.getKeys()
		const mint = {
			info: mintInfo,
			keys: mintActiveKeys,
			keysets: mintAllKeysets,
			url: mintUrl,
		}

		return mint
	} catch (error) {
		const err = ensureError(error);
		throw new ContextError(`Could not load mint`, {
			cause: err,
			context: {
				url: mintUrl,
			},
		});
	}
}