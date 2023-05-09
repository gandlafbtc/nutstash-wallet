import type { Mint } from '../../../src/model/mint';
import type { Proof } from '@cashu/cashu-ts';

/**
 * returns a subset of tokens, so that not all tokens are sent to mint for smaller amounts.
 * @param amount
 * @param tokens
 * @returns
 */
const getTokensToSend = (amount: number, tokens: Array<Proof>) => {
	let tokenAmount = 0;
	const tokenSubset = tokens.filter((token) => {
		if (tokenAmount < amount) {
			tokenAmount += token.amount;
			return true;
		}
	});
	return tokenSubset;
};

const validateMintKeys = (keys: object): boolean => {
	let isValid = true;
	try {
		const allKeys = Object.keys(keys);

		if (!allKeys) {
			return false;
		}

		if (allKeys.length < 1) {
			return false;
		}
		allKeys.forEach((k) => {
			//try parse int?
			if (isNaN(k)) {
				isValid = false;
			}
			if (!isPow2(k)) {
				isValid = false;
			}
		});
		return isValid;
	} catch (error) {
		return false;
	}
};

const isPow2 = (number: number) => {
	return Math.log2(number) % 1 === 0;
};

/**
 * returns a subset of all tokens that belong to the specified mint
 * @param mint
 * @param tokens
 * @returns
 */
const getTokensForMint = (mint: Mint, tokens: Array<Proof>) => {
	const tokenSubset = tokens.filter((token) => {
		if (mint?.keysets.includes(token.id)) {
			return true;
		} else {
			return false;
		}
	});
	return tokenSubset;
};

const isValidToken = (obj: any) => {
	// todo implement
	return true;
};

/**
 * removes a set of tokens from another set of tokens, and returns the remaining.
 * @param tokens
 * @param tokensToRemove
 * @returns
 */
const getTokenSubset = (tokens: Array<Proof>, tokensToRemove: Array<Proof>) => {
	return tokens.filter((token) => !tokensToRemove.includes(token));
};

const getMintForToken = (token: Proof, mints: Array<Mint>): Mint | undefined => {
	let mint: Mint | undefined = undefined;
	mints.forEach((m) => {
		if (m.keysets.includes(token.id)) {
			mint = m;
		}
	});
	return mint;
};

const getAmountForTokenSet = (tokens: Array<Proof>): number => {
	return tokens.reduce((acc, t) => {
		return acc + t.amount;
	}, 0);
};

const getKeysetsOfTokens = (tokens: Array<Proof>) => {
	return removeDuplicatesFromArray(
		tokens.map((t) => {
			return t.id;
		})
	);
};

const removeDuplicatesFromArray = <Type>(array: Array<Type>) => {
	return array.reduce((acc: Array<Type>, curr: Type) => {
		if (acc.includes(curr)) {
			return acc;
		} else {
			return [...acc, curr];
		}
	}, []);
};

export {
	getMintForToken,
	getTokensToSend,
	getTokensForMint,
	getTokenSubset,
	getAmountForTokenSet,
	getKeysetsOfTokens,
	removeDuplicatesFromArray,
	isValidToken,
	validateMintKeys
};
