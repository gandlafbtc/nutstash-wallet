import type { Proof } from '$lib/db/models/types';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import { createDefaultStoreFunctions } from './helper/storeHelper';

const proofsEncryptionHelper = await createEncryptionHelper<Proof>('encrypted-proofs')
const offflineProofsEncryptionHelper = await createEncryptionHelper<Proof>('encrypted-offline-proofs')
const pendingProofsEncryptionHelper = await createEncryptionHelper<Proof>('encrypted-pending-proofs')
const spentProofsEncryptionHelper = await createEncryptionHelper<Proof>('encrypted-spent-proofs')

const createProofsStore = (encryptionHelper: EncryptionHelper<Proof>) => {
    const initialProofs: Array<Proof> = [];
    const store = writable<Array<Proof>>(initialProofs);
    const defaultFuncs = createDefaultStoreFunctions(encryptionHelper, store);

	const getByKeysetIds = (keysets: string[]) => {
		return get(store).filter(proof => keysets.includes(proof.id))
	}

    return {...store, ...defaultFuncs, getByKeysetIds };
}

export const proofsStore = await createProofsStore(proofsEncryptionHelper)
export const offlineProofsStore = await createProofsStore(offflineProofsEncryptionHelper)
export const pendingProofsStore = await createProofsStore(pendingProofsEncryptionHelper)
export const spentProofsStore = await createProofsStore(spentProofsEncryptionHelper)
