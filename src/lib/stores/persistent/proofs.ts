import type { Proof } from '$lib/db/models/types';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper } from './helper/encryptionHelper';




const proofsEncryptionHelper = await createEncryptionHelper<Proof[]>('encrypted-proofs')
const offflineProofsEncryptionHelper = await createEncryptionHelper<Proof[]>('encrypted-offline-proofs')
const pendingProofsEncryptionHelper = await createEncryptionHelper<Proof[]>('encrypted-pending-proofs')
const spentProofsEncryptionHelper = await createEncryptionHelper<Proof[]>('encrypted-spent-proofs')



export const createProofsStore = async <T>(encryptionHelper: {encrypt: Function, decrypt: Function}) => {
	const store = writable<Proof[]>([]);

	const load = async () => {
		const data = await encryptionHelper.decrypt()
		if (data) {
			store.set(data)
		}
	}

	const add = async (proofs: Proof[])  => {
		store.update(context => [...proofs,...context])
		const data = await encryptionHelper.encrypt(get(store))
	}

	return {...store, load, add}
}



export const proofs = await createProofsStore(proofsEncryptionHelper)
export const offlineProofs = await createProofsStore(offflineProofsEncryptionHelper)
export const pendingProofs = await createProofsStore(pendingProofsEncryptionHelper)
export const spentProofs = await createProofsStore(spentProofsEncryptionHelper)
