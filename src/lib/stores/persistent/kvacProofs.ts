import type { KvacCoin } from '$lib/db/models/types';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions } from './helper/storeHelper';

const kvacProofsEncryptionHelper = createEncryptionHelper<KvacCoin>('encrypted-kvac-proofs');
//const offflineKvacProofsEncryptionHelper = createEncryptionHelper<KvacCoin>('encrypted-offline-kvac-proofs');
const pendingKvacProofsEncryptionHelper = createEncryptionHelper<KvacCoin>('encrypted-pending-kvac-proofs');
const spentKvacProofsEncryptionHelper = createEncryptionHelper<KvacCoin>('encrypted-spent-kvac-proofs');

const createProofsStore = (encryptionHelper: EncryptionHelper<KvacCoin>) => {
	const initialKvacCoins: Array<KvacCoin> = [];
	const store = writable<Array<KvacCoin>>(initialKvacCoins);
	const defaultFuncs = createDefaultStoreFunctions(encryptionHelper, store);

	const removeMany = async (tags: string[]) => {
		store.update((context) => context.filter((o) => !tags.includes(o.coin.mac.t as unknown as string)));
		await encryptionHelper.encrypt(get(store));
	};

	const getByKeysetIds = (keysets: string[]) => {
		return get(store).filter((KvacCoin) => keysets.includes(KvacCoin.id));
	};

	return { ...store, ...defaultFuncs, getByKeysetIds, removeMany };
};

export const kvacCoinsStore = createProofsStore(kvacProofsEncryptionHelper);
//export const offlineKvacCoinsStore = createProofsStore(offflineKvacProofsEncryptionHelper);
export const pendingKvacCoinssStore = createProofsStore(pendingKvacProofsEncryptionHelper);
export const spentKvacCoinsStore = createProofsStore(spentKvacProofsEncryptionHelper);
