import type { Proof } from '$lib/db/models/types';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions } from './helper/storeHelper';

const proofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-proofs')
const offflineProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-offline-proofs')
const pendingProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-pending-proofs')
const spentProofsEncryptionHelper = createEncryptionHelper<Proof>('encrypted-spent-proofs')

const createProofsStore = (encryptionHelper: EncryptionHelper<Proof>) => {
    const initialProofs: Array<Proof> = [];
    const store = writable<Array<Proof>>(initialProofs);
    const defaultFuncs = createDefaultStoreFunctions(encryptionHelper, store);

	const getByKeysetIds = (keysets: string[]) => {
		return get(store).filter(proof => keysets.includes(proof.id))
	}

    return {...store, ...defaultFuncs, getByKeysetIds };
}

export const proofsStore = createProofsStore(proofsEncryptionHelper)
export const offlineProofsStore = createProofsStore(offflineProofsEncryptionHelper)
export const pendingProofsStore = createProofsStore(pendingProofsEncryptionHelper)
export const spentProofsStore = createProofsStore(spentProofsEncryptionHelper)
