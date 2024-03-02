import {
	type AmountPreference,
	CashuMint,
	CashuWallet,
	deriveKeysetId,
	getEncodedToken,
	type MintKeys,
	type Proof
} from '@cashu/cashu-ts';
import {
	encodeBase64toUint8,
	encodeUint8toBase64,
	encodeBase64ToJson
} from '@cashu/cashu-ts/src/base64';
import type { Mint } from '../model/mint';
import { mints } from '../stores/mints';
import { get } from 'svelte/store';
import { toast } from '../stores/toasts';
import { counts } from '../stores/counts';
import { history } from '../stores/history';
import { token } from '../stores/tokens';
import { seed } from '../stores/mnemonic';
import { HistoryItemType } from '../model/historyItem';
import { getAmountForTokenSet, getKeysetsOfTokens, getTokenSubset } from '../comp/util/walletUtils';
import { pendingTokens } from '../stores/pendingtokens';
import { browser } from '$app/environment';
import { iv, key, seedIv } from '../stores/key';
import { randomBytes } from '@noble/hashes/utils';
import { isEncrypted } from '../stores/settings';

export const send = async (
	mint: Mint,
	amount: number,
	proofsToSend: Proof[],
	preference?: AmountPreference[]
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const { returnChange, send, newKeys } = await wallet.send(
		amount,
		proofsToSend,
		preference,
		count
	);

	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	if (seedPhrase) {
		updateCount(keysetId, (count ?? 1) + returnChange.length + send.length);
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
				encodedToken: get(isEncrypted) ? '' : encodedToken,
				mint: mint.mintURL,
				keyset: getKeysetsOfTokens([...proofsToSend, ...returnChange]),
				send: get(isEncrypted) ? [] : send,
				returnChange: get(isEncrypted) ? [] : returnChange
			}
		},
		...state
	]);
	return encodedToken;
};

const getWalletStuff = (mint: Mint) => {
	const cashuMint: CashuMint = new CashuMint(mint.mintURL);
	const seedPhrase = get(seed);
	const wallet: CashuWallet = new CashuWallet(
		cashuMint,
		mint.keys,
		seedPhrase ? seedPhrase : undefined
	);
	let count = undefined;
	let keysetId = '';
	if (seedPhrase) {
		keysetId = deriveKeysetId(mint.keys);
		count = get(counts).find((c) => c.keysetId === keysetId)?.count ?? 1;
	}
	return { count, keysetId, wallet, seedPhrase };
};

export const mint = async (
	mint: Mint,
	amount: number,
	hash: string,
	invoice: string,
	preference?: AmountPreference[]
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const { proofs, newKeys } = await wallet.requestTokens(amount, hash, preference, count);
	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	if (seedPhrase) {
		updateCount(keysetId, (count ?? 1) + proofs.length);
	}
	token.update((state) => [...state, ...proofs]);
	history.update((state) => [
		{
			type: HistoryItemType.MINT,
			amount: amount,
			date: Date.now(),
			data: {
				mintingHash: hash,
				mint: mint?.mintURL,
				keyset: getKeysetsOfTokens(proofs),
				invoice: invoice,
				tokens: get(isEncrypted) ? [] : proofs
			}
		},
		...state
	]);
	return { proofs };
};

export const receive = async (
	mint: Mint,
	encodedToken: string,
	preference?: AmountPreference[]
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const {
		token: tokens,
		tokensWithErrors,
		newKeys
	} = await wallet.receive(encodedToken, preference, count);

	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	const proofs = tokens.token.map((t) => t.proofs).flat();

	if (seedPhrase) {
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
				encodedToken: get(isEncrypted) ? '' : encodedToken,
				mint: mint?.mintURL ?? '',
				keyset: getKeysetsOfTokens(proofs),
				receivedTokens: get(isEncrypted) ? [] : proofs
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
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	let currentCount = count;
	const { returnChange, send, newKeys } = await wallet.send(
		amount + fees,
		proofs,
		undefined,
		currentCount
	);
	if (newKeys) {
		updateMintKeys(mint, newKeys);
	}
	if (seedPhrase) {
		currentCount = updateCount(keysetId, (currentCount ?? 1) + returnChange.length + send.length);
	}

	// remove sent tokens from storage
	token.update((state) => {
		return state.filter((token) => !proofs.includes(token));
	});
	if (returnChange) {
		token.update((state) => [...returnChange, ...state]);
	}

	const {
		isPaid,
		preimage,
		change,
		newKeys: newKeys2
	} = await wallet.payLnInvoice(invoice, send, undefined, currentCount);
	if (newKeys2) {
		updateMintKeys(mint, newKeys2);
	}
	if (seedPhrase) {
		currentCount = updateCount(keysetId, (currentCount ?? 1) + change.length);
	}

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
				change: get(isEncrypted) ? [] : returnChange
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

export const updateCount = (keysetId: string, newCount: number): number => {
	const allCounts = [...get(counts)];
	let toBeUpdated = allCounts.find((c) => c.keysetId === keysetId);
	if (!toBeUpdated) {
		toBeUpdated = { keysetId, count: newCount };
		allCounts.push(toBeUpdated);
	}
	toBeUpdated.count = newCount;
	counts.set(allCounts);
	return newCount;
};

export const encrypt = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		iv.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(iv) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key ');
	}
};

export const decrypt = async (payload: string): Promise<Proof[]> => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(iv) },
			k,
			encodeBase64toUint8(payload)
		);
		return encodeBase64ToJson(encodeUint8toBase64(new Uint8Array(decrypted)));
	} else {
		throw new Error('tried to use encryption without key');
	}
};
export const encryptSeed = async (payload: string): Promise<string> => {
	const k = get(key);
	if (browser && k) {
		seedIv.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(seedIv) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key');
	}
};

export const decryptSeed = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(seedIv) },
			k,
			encodeBase64toUint8(payload)
		);
		let decoded = new TextDecoder().decode(decrypted);
		decoded = decoded.replace(/^"(.*)"$/, '$1');
		return JSON.parse(decoded);
	} else {
		throw new Error('tried to use encryption without key');
	}
};

export const kdf = async (password: string): Promise<CryptoKey> => {
	return await window.crypto.subtle
		.importKey(
			//the format that we are input
			'raw',
			//the input in the properly format
			new TextEncoder().encode(password),
			//the kind of key (in that case it's a password to derive a key!)
			{ name: 'PBKDF2' },
			//if I permit that this material could be exported
			false,
			//what I permit to be processed against that (password to derive a) key
			['deriveBits', 'deriveKey']
			// the derive key process
		)
		.then((keyMaterial) =>
			window.crypto.subtle.deriveKey(
				{
					name: 'PBKDF2',
					salt: new TextEncoder().encode('21mil'),
					iterations: 1000,
					hash: 'SHA-256'
				},
				// it should be an object of CryptoKey type
				keyMaterial,
				// which kind of algorithm I permit to be used with that key
				{ name: 'AES-CBC', length: 256 },
				// is that exportable?
				true,
				// what is allowed to do with that key
				['encrypt', 'decrypt']
			)
		);
};
