import {
	type AmountPreference,
	CashuMint,
	CashuWallet,
	deriveKeysetId,
	getEncodedToken,
	type MintKeys,
	type Proof
} from '@cashu/cashu-ts';
import type { Mint } from '../model/mint';
import { mints } from '../stores/mints';
import { get } from 'svelte/store';
import { toast } from '../stores/toasts';
import { counts } from '../stores/counts';
import { history } from '../stores/history';
import { token } from '../stores/tokens';
import { mnemonic } from '../stores/mnemonic';
import { HistoryItemType } from '../model/historyItem';
import { getAmountForTokenSet, getKeysetsOfTokens, getTokenSubset } from '../comp/util/walletUtils';
import { pendingTokens } from '../stores/pendingtokens';

export const send = async (
	mint: Mint,
	amount: number,
	proofsToSend: Proof[],
	preference?: AmountPreference[]
) => {
	const cashuMint = new CashuMint(mint.mintURL);
	const cashuWallet = new CashuWallet(cashuMint, mint.keys);
	const { returnChange, send, newKeys } = await cashuWallet.send(amount, proofsToSend, preference);

	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}

	//remove all tokens that have been sent to mint from storage
	token.update((state) => getTokenSubset(state, proofsToSend));
	//add the tokens that are being sent to pending
	pendingTokens.update((state) => [...send, ...state]);

	//add newly minted tokens that have been returned as change
	token.update((state) => [...state, ...returnChange]);

	const encodedToken = getEncodedToken({
		token: [{ proofs: send, mint: mint.mintURL }]
	});
	history.update((state) => [
		{
			type: HistoryItemType.SEND,
			amount: amount,
			date: Date.now(),
			data: {
				encodedToken,
				mint: mint.mintURL,
				keyset: getKeysetsOfTokens([...proofsToSend, ...returnChange]),
				send,
				returnChange
			}
		},
		...state
	]);
	return encodedToken;
};

// export const mint = async () => {

// }

export const receive = async (
	mint: Mint,
	encodedToken: string,
	preference?: AmountPreference[]
) => {
	const cashuMint: CashuMint = new CashuMint(mint.mintURL);
	const cashuWallet: CashuWallet = new CashuWallet(
		cashuMint,
		mint.keys,
		get(mnemonic) ? get(mnemonic) : undefined
	);
	let count = undefined;
	let keysetId = '';
	if (get(mnemonic)) {
		keysetId = deriveKeysetId(mint.keys);
		count = get(counts).find((c) => c.keysetId === keysetId)?.count ?? 1;
	}
	const {
		token: tokens,
		tokensWithErrors,
		newKeys
	} = await cashuWallet.receive(encodedToken, preference, count);

	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	const proofs = tokens.token.map((t) => t.proofs).flat();

	if (get(mnemonic)) {
		updateCount(keysetId, (count ?? 1) + proofs.length);
	}

	token.update((state) => [...state, ...proofs]);

	if (tokensWithErrors) {
		throw new Error('Not all tokens could be redeemed');
	}

	history.update((state) => [
		{
			type: HistoryItemType.RECEIVE,
			amount: getAmountForTokenSet(proofs),
			date: Date.now(),
			data: {
				encodedToken,
				mint: mint?.mintURL ?? '',
				keyset: getKeysetsOfTokens(proofs),
				receivedTokens: proofs
			}
		},
		...state
	]);

	return { proofs };
};

export const melt = async (
	mint: Mint,
	amount: number,
	fees: number,
	proofs: Proof[],
	invoice: string
) => {
	const cashuMint: CashuMint = new CashuMint(mint.mintURL);

	const cashuWallet: CashuWallet = new CashuWallet(cashuMint, mint.keys);

	const { returnChange, send, newKeys } = await cashuWallet.send(amount + fees, proofs);
	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	console.log(send);
	// remove sent tokens from storage
	token.update((state) => {
		return state.filter((token) => !proofs.includes(token));
	});
	if (returnChange) {
		token.update((state) => [...returnChange, ...state]);
	}

	const { isPaid, preimage, change } = await cashuWallet.payLnInvoice(invoice, send);
	token.update((state) => [...change, ...state]);
	history.update((state) => [
		{
			type: HistoryItemType.MELT,
			amount: amount + fees - getAmountForTokenSet(change),
			date: Date.now(),
			data: {
				preimage,
				mint: mint?.mintURL,
				keyset: getKeysetsOfTokens(send),
				invoice,
				change: returnChange
			}
		},
		...state
	]);
	if (!isPaid) {
		//re-add tokens that were sent if invoice is not paid
		token.update((state) => [...send, ...state]);
		return false;
	}
	return true;
};

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
		toBeUpdated = { keysetId, count: newCount };
		allCounts.push(toBeUpdated);
	}
	toBeUpdated.count = newCount;
	counts.set(allCounts);
};
