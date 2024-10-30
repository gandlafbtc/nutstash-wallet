import {
	CashuMint,
	CashuWallet,
	getEncodedToken,
	type Proof,
	type MeltQuoteResponse,
	getDecodedToken,
	type OutputAmounts
} from '@cashu/cashu-ts';
import {
	encodeBase64toUint8,
	encodeUint8toBase64,
	encodeBase64ToJson
} from '@cashu/cashu-ts/src/base64';
import type { Mint } from '$lib/model/mint';
import { get } from 'svelte/store';
import { counts } from '$lib/stores/counts';
import { history } from '$lib/stores/history';
import { token } from '$lib/stores/tokens';
import { seed } from '$lib/stores/mnemonic';
import { HistoryItemType } from '$lib/model/historyItem';
import {
	getAmountForTokenSet,
	getKeysForUnit,
	getKeysetsOfTokens,
	getTokenSubset
} from '$lib/util/walletUtils';
import { pendingTokens } from '$lib/stores/pendingtokens';
import { browser } from '$app/environment';
import { iv, ivOffline, ivPending, ivSpent, key, nostrKeysIv, seedIv } from '$lib/stores/key';
import { randomBytes, hexToBytes } from '@noble/hashes/utils';
import { isEncrypted } from '$lib/stores/settings';
import { decode } from '@gandlaf21/bolt11-decode';
import {
	nostrPool,
	nostrKeys,
	nostrRelays,
	useExternalNostrKey,
	type NostrKeys
} from '$lib/stores/nostr';
import * as nostrTools from 'nostr-tools';
import { offlineTokens } from '$lib/stores/offlinetokens';

export const send = async (
	mint: Mint,
	amount: number,
	proofsToSend: Proof[],
	memo?: string,
	preference?: OutputAmounts,
	pubkey?: string
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const { keep, send } = await wallet.send(amount, proofsToSend, {
		outputAmounts:preference,
		counter: count,
		pubkey
	});

	if (seedPhrase) {
		updateCount(keysetId, (count ?? 1) + keep.length + send.length);
	}
	//remove all tokens that have been sent to mint from storage
	token.update((state) => getTokenSubset(state, proofsToSend));
	//add the tokens that are being sent to pending
	pendingTokens.update((state) => [...send, ...state]);

	//add newly minted tokens that have been returned as change
	token.update((state) => [...state, ...keep]);

	const encodedToken = getEncodedToken({
		token: [{ proofs: send, mint: mint.mintURL }],
		memo
	});
	history.update((state) => [
		{
			type: HistoryItemType.SEND,
			amount: amount,
			date: Date.now(),
			data: {
				encodedToken: get(isEncrypted) ? '' : encodedToken,
				mint: mint.mintURL,
				keyset: getKeysetsOfTokens([...proofsToSend, ...keep]),
				send: get(isEncrypted) ? [] : send,
				returnChange: get(isEncrypted) ? [] : keep
			}
		},
		...state
	]);
	return encodedToken;
};

export const getMyPubKey = async (): Promise<string> => {
	return get(useExternalNostrKey)
		? await window.nostr.getPublicKey()
		: await Promise.resolve(get(nostrKeys).length ? get(nostrKeys)[0] : '');
};

const getEncryptedContent = async (toPub: string, message: string): Promise<string> => {
	return get(useExternalNostrKey)
		? await window.nostr.nip04.encrypt(await toPub, message)
		: //@ts-ignore
			await nostrTools.nip04.encrypt(get(nostrPrivKey), toPub, message);
};

export const getConvertedPubKey = async (key: string) => {
	key = await resolveNip05(key);
	let nostrPubKey = key.startsWith('npub') ? (nostrTools.nip19.decode(key).data as string) : key;
	return nostrPubKey;
};

const resolveNip05 = async (nostrAddr: string) => {
	if (!nostrAddr.includes('.')) {
		return nostrAddr;
	}
	const profile = await nostrTools.nip05.queryProfile(nostrAddr);
	if (profile?.pubkey) {
		return profile?.pubkey;
	} else {
		throw new Error('could not fetch nip-05');
	}
};

export const sendViaNostr = async (toPub: string, message: string) => {
	if (!get(nostrKeys).length) {
		throw new Error('no nostr keys found');
	}
	const event: nostrTools.UnsignedEvent = {
		kind: nostrTools.kinds.EncryptedDirectMessage,
		//@ts-ignore
		tags: [['p', await getConvertedPubKey(toPub)]],
		content: await getEncryptedContent(toPub, message),
		created_at: Math.floor(Date.now() / 1000),
		pubkey: await getMyPubKey()
	};
	if (get(useExternalNostrKey)) {
		const signedEvent = await window.nostr.signEvent(event);
		get(nostrPool).publish(
			signedEvent,
			get(nostrRelays)
				.filter((r) => r.isActive)
				.map((r) => r.url)
		);
		return signedEvent;
	} else {
		event.id = nostrTools.getEventHash(event);
		const signedEvent = nostrTools.finalizeEvent(event, hexToBytes(get(nostrKeys)[0]?.priv));

		get(nostrPool).publish(
			signedEvent,
			get(nostrRelays)
				.filter((r) => r.isActive)
				.map((r) => r.url)
		);
		return signedEvent;
	}
};

const getWalletStuff = (mint: Mint) => {
	const keys = getKeysForUnit(mint.keys);
	const cashuMint: CashuMint = new CashuMint(mint.mintURL);
	const seedPhrase = get(seed);
	const wallet: CashuWallet = new CashuWallet(cashuMint, {
		keys,
		mnemonicOrSeed: seedPhrase ? seedPhrase : undefined
	});
	let count = undefined;
	let keysetId = wallet.keys.id;
	if (seedPhrase) {
		count = get(counts).find((c) => c.keysetId === keysetId)?.count ?? 1;
	}
	return { count, keysetId, wallet, seedPhrase };
};

export const mint = async (
	mint: Mint,
	amount: number,
	quote: string,
	preference?: OutputAmounts
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const { proofs } = await wallet.mintProofs(amount, quote, {
		outputAmounts: preference,
		counter: count,
		keysetId
	});
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
				mintingHash: quote,
				mint: mint.mintURL,
				keyset: getKeysetsOfTokens(proofs),
				tokens: get(isEncrypted) ? [] : proofs
			}
		},
		...state
	]);
	return { proofs };
};

export const receiveOffline = (encodedToken: string) => {
	const tokn = getDecodedToken(encodedToken);

	const proofs = tokn.token.map((t) => t.proofs).flat();

	offlineTokens.update((ctx) => [...proofs, ...ctx]);
	history.update((state) => [
		{
			type: HistoryItemType.RECEIVE_OFFLINE,
			amount: getAmountForTokenSet(proofs),
			date: Date.now(),
			data: {
				encodedToken: get(isEncrypted) ? '' : encodedToken,
				mint: tokn.token[0].mint ?? '',
				keyset: getKeysetsOfTokens(proofs),
				receivedTokens: get(isEncrypted) ? [] : proofs
			}
		},
		...state
	]);
};

// const addSigsToToken = async (tkn: Token) => {
// 	for (const [i,token] of tkn.token.entries()) {
// 		for (const [j,p] of token.proofs.entries()) {
// 			try {
// 				parseSecret(p.secret)
// 				const sig = await window.nostr.signSchnorr(p.secret)
// 				console.log(sig)
// 				tkn.token[i].proofs[j].witness = { signatures: [sig] }
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 	}
// 	return tkn
// }

export const receive = async (
	mint: Mint,
	encodedToken: string,
	preference?: OutputAmounts,
	privKey?: string
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	const proofs = await wallet.receive(encodedToken, {
		outputAmounts: preference,
		counter: count,
		privkey: privKey ? privKey : undefined
	});

	if (seedPhrase) {
		updateCount(keysetId, (count ?? 1) + proofs.length);
	}

	token.update((state) => [...state, ...proofs]);

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

export const meltQuote = async (mint: Mint, invoice: string): Promise<MeltQuoteResponse> => {
	let meltQuote: MeltQuoteResponse;
	try {
		if (invoice.startsWith('lightning:')) {
			invoice = invoice.split(':')[1];
		}
		let amount = decode(invoice).sections[2].value / 1000;
		if (!amount) {
			throw new Error('Invoice must contain amount');
		}
		const cashuMint: CashuMint = new CashuMint(mint.mintURL);
		meltQuote = await cashuMint.createMeltQuote({ unit: 'sat', request: invoice });
	} catch {
		throw new Error('Could not fetch melt quote');
	}
	return meltQuote;
};

export const melt = async (
	mint: Mint,
	meltQuote: MeltQuoteResponse,
	proofs: Proof[],
	invoice: string
) => {
	const { count, keysetId, seedPhrase, wallet } = getWalletStuff(mint);
	let currentCount = count;
	const { keep, send } = await wallet.send(
		meltQuote.amount + meltQuote.fee_reserve,
		proofs,
		{
			counter: currentCount
		}
	);
	if (seedPhrase) {
		currentCount = updateCount(keysetId, (currentCount ?? 1) + keep.length + send.length);
	}

	// remove sent tokens from storage
	token.update((state) => {
		return state.filter((t) => !proofs.includes(t));
	});

	pendingTokens.update((state) => [...proofs, ...state]);

	if (keep) {
		token.update((state) => [...keep, ...state]);
	}

	//TODO implement with melt quote

	const { isPaid, preimage, change } = await wallet.payLnInvoice(invoice, send, meltQuote, {
		counter: currentCount
	});

	if (seedPhrase) {
		currentCount = updateCount(keysetId, (currentCount ?? 1) + change.length);
	}

	token.update((state) => [...change, ...state]);
	history.update((state) => [
		{
			type: HistoryItemType.MELT,
			amount: meltQuote.amount + meltQuote.fee_reserve - getAmountForTokenSet(change),
			date: Date.now(),
			data: {
				preimage,
				mint: mint?.mintURL,
				keyset: getKeysetsOfTokens(send),
				invoice,
				change: get(isEncrypted) ? [] : keep
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

export const encryptSpentTokens = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		ivSpent.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(ivSpent) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key ');
	}
};

export const decryptSpentTokens = async (payload: string): Promise<Proof[]> => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(ivSpent) },
			k,
			encodeBase64toUint8(payload)
		);
		return encodeBase64ToJson(encodeUint8toBase64(new Uint8Array(decrypted)));
	} else {
		throw new Error('tried to use encryption without key');
	}
};

export const encryptPendingTokens = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		ivPending.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(ivPending) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key ');
	}
};

export const decryptPendingTokens = async (payload: string): Promise<Proof[]> => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(ivPending) },
			k,
			encodeBase64toUint8(payload)
		);
		return encodeBase64ToJson(encodeUint8toBase64(new Uint8Array(decrypted)));
	} else {
		throw new Error('tried to use encryption without key');
	}
};

export const encryptOfflineTokens = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		ivOffline.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(ivOffline) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key ');
	}
};

export const decryptOfflineTokens = async (payload: string): Promise<Proof[]> => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(ivOffline) },
			k,
			encodeBase64toUint8(payload)
		);
		return encodeBase64ToJson(encodeUint8toBase64(new Uint8Array(decrypted)));
	} else {
		throw new Error('tried to use encryption without key');
	}
};

export const encryptNostrKeys = async (payload: string) => {
	const k = get(key);
	if (browser && k) {
		nostrKeysIv.set(randomBytes(16));
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: get(nostrKeysIv) },
			k,
			new TextEncoder().encode(payload)
		);
		return encodeUint8toBase64(new Uint8Array(encrypted));
	} else {
		throw new Error('tried to use encryption without key ');
	}
};

export const decryptNostrKeys = async (payload: string): Promise<NostrKeys[]> => {
	const k = get(key);
	if (browser && k) {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: get(nostrKeysIv) },
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
