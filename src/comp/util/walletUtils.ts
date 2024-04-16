import type { Keys, MintActiveKeys, MintKeys } from '@cashu/cashu-ts';
import type { Mint } from '../../../src/model/mint';
import type { Proof } from '@cashu/cashu-ts';

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
