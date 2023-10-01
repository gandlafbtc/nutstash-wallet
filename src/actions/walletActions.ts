import { deriveKeysetId, type MintKeys } from '@cashu/cashu-ts';
import type { Mint } from '../model/mint';
import { mints } from '../stores/mints';
import { get } from 'svelte/store';
import { toast } from '../stores/toasts';
import { counts } from '../stores/counts';

// export const send = async () => {

// }

// export const mint = async () => {

// }

// export const receive = async () => {

// }

// export const melt = async () => {

// }

export const updateMintKeys = (mint: Mint, newKeys: MintKeys) => {
	const allMints = [...get(mints)];
	const toBeUpdated = allMints.find((m) => mint.mintURL === m.mintURL);
	if (!toBeUpdated) {
		toast(
			'error',
			'the keys of this mint have changed, but could not be updated in the wallet',
			'Error'
		);
		throw new Error('could not update mint keys');
	}
	toBeUpdated.keys = newKeys;
	const newKeyset = deriveKeysetId(newKeys);
	toBeUpdated.keysets = [newKeyset, ...toBeUpdated.keysets];
	mints.set(allMints);
	toast('info', 'the new keyset ID is: ' + newKeyset, 'The keys of this mint have rotated');
};

export const updateCount = (keysetId: string, newCount: number) => {
	const allCounts = [...get(counts)];
	let toBeUpdated = allCounts.find((c) => c.keysetId === keysetId);
	if (!toBeUpdated) {
		toBeUpdated = {keysetId, count:newCount}
		allCounts.push(toBeUpdated)
	}
	toBeUpdated.count = newCount;
	counts.set(allCounts);
};

