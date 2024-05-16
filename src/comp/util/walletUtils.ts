import type { Keys, MintActiveKeys, MintKeys } from '@cashu/cashu-ts';
import type { Mint } from '../../../src/model/mint';
import type { Proof } from '@cashu/cashu-ts';
import { bech32 } from "bech32";
import { Buffer } from "buffer";
import { parseSecret } from '@gandlaf21/cashu-crypto/modules/common/NUT11';
/**
 * returns a subset of tokens, so that not all tokens are sent to mint for smaller amounts.
 * @param amount
 * @param tokens
 * @returns
 */
export const getTokensToSend = (amount: number, tokens: Array<Proof>) => {
	let tokenAmount = 0;
	const tokenSubset = tokens.filter((token) => {
		if (tokenAmount < amount) {
			tokenAmount += token.amount;
			return true;
		}
	});
	return tokenSubset;
};

export const getLockedTokens = (proofs: Proof[])=> {
	return proofs.filter(p=>{ try {
		parseSecret(p.secret)
		return true	
	} catch (error) {
		return false
	}})
} 

export const getKeysForUnit = (keys: MintKeys[], unit = 'sat'): MintKeys | undefined => {
	return keys.find((k) => {
		return k.unit === unit;
	});
};
export const getKeysForKeysetId = (keys: MintKeys[], keysetId: string): MintKeys | undefined => {
	return keys.find((k) => {
		return k.id === keysetId;
	});
};

export const validateMintKeys = (keys: MintActiveKeys): boolean => {
	let isValid = true;
	try {
		const keysets = keys.keysets.map((ks) => ks.keys);
		if (!keysets.length) {
			return false;
		}
		if (!keysets) {
			return false;
		}
		keysets.forEach((ks) => {
			const allKeys = Object.keys(ks);
			allKeys.forEach((k) => {
				//try parse int?
				if (isNaN(k)) {
					isValid = false;
				}
				if (!isPow2(k)) {
					isValid = false;
				}
			});
		});
		return isValid;
	} catch (error) {
		return false;
	}
};

export const isPow2 = (number: number) => {
	return Math.log2(number) % 1 === 0;
};

/**
 * returns a subset of all tokens that belong to the specified mint
 * @param mint
 * @param tokens
 * @returns
 */
export const getTokensForMint = (mint: Mint, tokens: Array<Proof>) => {
	const tokenSubset = tokens.filter((token) => {
		if (mint?.keysets.map((k) => k.id).includes(token.id)) {
			return true;
		} else {
			return false;
		}
	});
	return tokenSubset;
};

export const isValidToken = (obj: any) => {
	// todo implement
	return true;
};

/**
 * removes a set of tokens from another set of tokens, and returns the remaining.
 * @param tokens
 * @param tokensToRemove
 * @returns
 */
export const getTokenSubset = (tokens: Array<Proof>, tokensToRemove: Array<Proof>) => {
	return tokens.filter((token) => !tokensToRemove.includes(token));
};

export const getMintForToken = (token: Proof, mints: Array<Mint>): Mint | undefined => {
	let mint: Mint | undefined = undefined;
	mints.forEach((m) => {
		if (m.keysets.map((k) => k.id).includes(token.id)) {
			mint = m;
		}
	});
	return mint;
};

export const getAmountForTokenSet = (tokens: Array<Proof>): number => {
	return tokens.reduce((acc, t) => {
		return acc + t.amount;
	}, 0);
};

export const getKeysetsOfTokens = (tokens: Array<Proof>) => {
	return removeDuplicatesFromArray(
		tokens.map((t) => {
			return t.id;
		})
	);
};

export const removeDuplicatesFromArray = <Type>(array: Array<Type>) => {
	return array.reduce((acc: Array<Type>, curr: Type) => {
		if (acc.includes(curr)) {
			return acc;
		} else {
			return [...acc, curr];
		}
	}, []);
};

export const formatAmount = (amount: number, unit: string, withSuffix = true): string => {
	if (unit === 'sat') {
		return formatSats(amount, withSuffix);
	} else {
		console.log(amount);
		return formatSats(amount, withSuffix);
	}
};

const formatSats = (amount: number, withSuffix: boolean): string => {
	return (
		new Intl.NumberFormat('en-US').format(amount) +
		(withSuffix ? ' ' + (amount > 1 ? 'sats' : 'sat') : '')
	);
};

export const getInvoiceFromAddress = async (address: string, amount: number):Promise<{pr:string, maxSendable: number, minSendable:number}> => {
	const addressParts = address.split("@")
	const endpoint = `https://${addressParts[1]}/.well-known/lnurlp/${addressParts[0]}`
	return await LNURLLookup(endpoint, amount)
}

export const getInvoiceFromLNURL = async (LNURL: string, amount: number):Promise<{pr:string, maxSendable: number, minSendable:number}> => {
	
	const { prefix: hrp, words: dataPart } = bech32.decode(LNURL, 2000)
	const requestByteArray = bech32.fromWords(dataPart)

	const endpoint = Buffer.from(requestByteArray).toString()
	return await LNURLLookup(endpoint, amount)
}

const LNURLLookup = async (endpoint:string, amount: number) => {
	const { callback, maxSendable, minSendable } = await (await fetch(endpoint)).json() as { callback: string, maxSendable: number, minSendable: number }
	if (!callback) {
		throw new Error("No callback url found.");
	}
	const cb = callback + (callback.includes('?') ? `&` : `?`) + `amount=${amount * 1000}`
	const { pr } = await (await fetch(cb)).json() as { pr: string }
	return {pr, maxSendable, minSendable}
}
