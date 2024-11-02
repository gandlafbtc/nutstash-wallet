import type { Keys, MintActiveKeys, MintKeys } from '@cashu/cashu-ts';
import type { Mint } from '$lib/model/mint';
import type { Proof } from '@cashu/cashu-ts';
import { bech32 } from 'bech32';
import { Buffer } from 'buffer';
// import { parseSecret } from '@cashu/crypto/modules/client/NUT11';
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

export const getLockedTokens = (proofs: Proof[]) => {
	return proofs.filter((p) => {
		try {
			// parseSecret(p.secret);
			return true;
		} catch (error) {
			return false;
		}
	});
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
 * returns a subset of all tokens that belong to the specified mints
 * @param mint
 * @param tokens
 * @returns
 */
export const getTokensForMints = (mints: Mint[], tokens: Array<Proof>, unit?: string) => {
	const tokenSubset = tokens.filter((token) => {
		if (mints.map(m=> m.keysets).flat().map((k) => k.id).includes(token.id)) {
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

export const formatAmount = (amount: number, unit: string): string => {
	if (unit === 'sat') {
		return formatSats(amount);
	}
	if (unit === 'msat') {
		return formatMSats(amount);
	}
	
	else {
		return formatFiat(amount,unit);
	}
};

export const formatTime = (time: number): string => {
	return  new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'medium'} ).format(time);
};

const formatSats = (amount: number): string => {
	return (
		'₿ '+new Intl.NumberFormat('en-US').format(amount)
		
	);
};

export const formatSecToMinStr = (seconds: number): string  =>  {
	if (seconds<=0) {
		return "00:00"
	}
	const m = Math.floor(seconds/60);
	const s = seconds%60;
	return m.toString().padStart(0) + ':' + s.toString().padStart(2, '0');
};

const formatMSats = (amount: number): string => {
	return (
		'₿ '+new Intl.NumberFormat('en-US' ,{minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(amount/1000)
		
	);
};

export const  getUnitSymbol = (unit: string): string => {
	switch (unit) {
		case 'sat':
			return '₿ (sat)';
		case 'msat':
			return '₿ (msat)';
		case 'btc':
			return '₿ (btc)';
		case 'usd': 
			return '$ (usd)';
		case 'eur': 
			return '€  (eur)';
		case 'gbp': 
			return '£  (gbp)';
		case 'jpy': 
			return '¥  (jpy)';
		case 'krw': 
			return '₩   (krw)';
			default:
			return unit
	}
}
const formatFiat = (amount: number, unit: string): string => {
	return (
		new Intl.NumberFormat('en-US', { style:'currency', minimumFractionDigits: 2, maximumFractionDigits: 2 , currency: unit.toUpperCase() }).format(amount/100)
	);
};

export const getInvoiceFromAddress = async (
	address: string,
	amount: number
): Promise<{ pr: string; maxSendable: number; minSendable: number }> => {
	const addressParts = address.split('@');
	const endpoint = `https://${addressParts[1]}/.well-known/lnurlp/${addressParts[0]}`;
	return await LNURLLookup(endpoint, amount);
};

export const getInvoiceFromLNURL = async (
	LNURL: string,
	amount: number
): Promise<{ pr: string; maxSendable: number; minSendable: number }> => {
	const { prefix: hrp, words: dataPart } = bech32.decode(LNURL, 2000);
	const requestByteArray = bech32.fromWords(dataPart);

	const endpoint = Buffer.from(requestByteArray).toString();
	return await LNURLLookup(endpoint, amount);
};

const LNURLLookup = async (endpoint: string, amount: number) => {
	const { callback, maxSendable, minSendable } = (await (await fetch(endpoint)).json()) as {
		callback: string;
		maxSendable: number;
		minSendable: number;
	};
	if (!callback) {
		throw new Error('No callback url found.');
	}
	const cb = callback + (callback.includes('?') ? `&` : `?`) + `amount=${amount * 1000}`;
	const { pr } = (await (await fetch(cb)).json()) as { pr: string };
	return { pr, maxSendable, minSendable };
};

export const isNumeric = (value: unknown) => typeof value === 'number' || !isNaN(value);

export const getUnitsForMints = (mints: Mint[]) => {
	console.log(mints.map(m=> m.keysets))
	const units = [...new Set(mints.map(m=>m.keys.keysets).flat().map(k=>k.unit))]
	if (!units.length) {
		units.push('sat')
	}
	return units
}