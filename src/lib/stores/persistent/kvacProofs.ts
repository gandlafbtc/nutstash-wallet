import type { Proof } from '$lib/db/models/types';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions } from './helper/storeHelper';

const kvacProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-kvac-proofs');
const offflineKvacProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-offline-kvac-proofs');
const pendingKvacProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-pending-kvac-proofs');
const spentKvacProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-spent-kvac-proofs');

const createProofsStore = (encryptionHelper: EncryptionHelper<Proof>) => {
	const initialProofs: Array<Proof> = [];
	const store = writable<Array<Proof>>(initialProofs);
	const defaultFuncs = createDefaultStoreFunctions(encryptionHelper, store);

	const getByKeysetIds = (keysets: string[]) => {
		return get(store).filter((proof) => keysets.includes(proof.id));
	};

	return { ...store, ...defaultFuncs, getByKeysetIds };
};

export const kvacProofsStore = createProofsStore(kvacProofsEncryptionHelper);
export const offlineKvacProofsStore = createProofsStore(offflineKvacProofsEncryptionHelper);
export const pendingKvacProofsStore = createProofsStore(pendingKvacProofsEncryptionHelper);
export const spentKvacProofsStore = createProofsStore(spentKvacProofsEncryptionHelper);
