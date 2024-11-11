import { browser } from '$app/environment';
import { ContextError, ensureError } from '$lib/helpers/errors';
import { CashuMint, CashuWallet, type MintActiveKeys } from '@cashu/cashu-ts';

import { get, writable } from 'svelte/store';
import { seed } from './mnemonic';
import type { Mint } from '$lib/db/models/types';
import { DB } from '$lib/db/db';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions, getBy } from './helper/storeHelper';
import { selectedMints } from '../local/selectedMints';
import { getHostFromUrl } from '$lib/util/utils';


const encryptionHelper = await createEncryptionHelper<Mint>('encrypted-mints')

export const createMintsStore = async (encryptionHelper: EncryptionHelper<Mint>) => {
	const store = writable<Mint[]>([]);
	const defaults = createDefaultStoreFunctions(encryptionHelper, store);


	const fetchMint = async (url: string) => {
		const mint = await loadMint(url)
		defaults.addOrUpdate(url, mint, 'url')
	}


	const getByHost = (host: string): Mint | undefined => {
		return get(store).find((m)=> host === getHostFromUrl(m.url));
	}

	return {
		...store,
		...defaults,
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
		const mintActiveKeys: MintActiveKeys = await cashuMint.getKeys()
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


