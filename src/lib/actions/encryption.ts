import { bytesToHex, hexToBytes, randomBytes } from '@noble/hashes/utils';

export const encrypt = async <T>(
	payload: T,
	k: CryptoKey
): Promise<{ cypher: Uint8Array; iv: string }> => {
	try {
		const iv = randomBytes(16);
		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv },
			k,
			new TextEncoder().encode(JSON.stringify(payload))
		);
		return { cypher: new Uint8Array(encrypted), iv: bytesToHex(iv) };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const decrypt = async <T>(
	payload: Uint8Array,
	k: CryptoKey,
	ivString: string
): Promise<T> => {
	try {
		const iv = hexToBytes(ivString);
		const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-CBC', iv }, k, payload);
		return JSON.parse(new TextDecoder().decode(new Uint8Array(decrypted))) as T;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const checkIfKeysMatch = async (key1: CryptoKey, key2: CryptoKey) => {
	try {
		type test = { test: string };
		const encrypted = await encrypt({ test: 'test' }, key1);
		const decrypted = (await decrypt(encrypted.cypher, key1, encrypted.iv)) as test;
		const decrypted2 = (await decrypt(encrypted.cypher, key2, encrypted.iv)) as test;
		if (decrypted?.test !== decrypted2?.test) {
			return false;
		}
		return true;
	} catch (error) {
		return false;
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
