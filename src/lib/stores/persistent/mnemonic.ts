import { get, writable } from 'svelte/store';
import { createEncryptionHelper, type EncryptionHelper } from './helper/encryptionHelper';
import type { StoredSeed } from '$lib/db/models/types';
import { createDefaultStoreFunctions } from './helper/storeHelper';
import { mnemonicToSeed } from '@scure/bip39';




const encryptionHelper = createEncryptionHelper<StoredSeed>('encrypted-mnemonics')

export const createSeedStore = (encryptionHelper: EncryptionHelper<StoredSeed>) => {
    const store = writable<StoredSeed[]>([]);
	const defaults = createDefaultStoreFunctions(encryptionHelper, store);
    
	return {
        ...store,
		...defaults,
	};
}


export const seed = writable<Uint8Array>();

export const mnemonic = createSeedStore(encryptionHelper)

mnemonic.subscribe(async (value)=> {
    if (value.length) {
        console.log(value[0].mnemonic)
        seed.set(await mnemonicToSeed(value[0].mnemonic))
    }
})