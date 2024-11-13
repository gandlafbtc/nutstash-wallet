import { DB } from "$lib/db/db";
import type { NutstashDB } from "$lib/db/model";
import { key } from "$lib/stores/session/key";
import type { StoreNames } from "idb";
import { get } from "svelte/store";
import * as encryption  from "$lib/actions/encryption";
import type { EncryptedStore } from "$lib/db/models/types";

export type EncryptionHelper<T> = { encrypt: (o: T[]) => Promise<void>, decrypt: () => Promise<T[]> };

export const createEncryptionHelper = <T>(dbStoreName: StoreNames<NutstashDB>): EncryptionHelper<T>  => {
	
	const encrypt = async <T>(o: T): Promise<void> => {
		try {
			const db = await DB.getInstance();
			const k = get(key)
			if (!k) {
				throw new Error("Key not set");
			}
			const { cypher, iv } = await encryption.encrypt<T>(o, k);
			db.put(dbStoreName, { cypher, iv, t: Date.now() }, 'default');
		} catch (error) {
			throw error
		}
	}

	const decrypt = async <T>(): Promise<T[]> => {
		
		try {
			const db = await DB.getInstance();
			const encrypted = await db.get(dbStoreName, 'default') as EncryptedStore;
			if (!encrypted) {
				return []
			}
			const k = get(key)
			if (!k) {
				throw new Error("Key not set");
			}
			const decrypted = await encryption.decrypt<T>(encrypted.cypher, k, encrypted.iv) as T[]
			console.log(decrypted)
			return decrypted
		} catch (error) {
			throw error	
		}
	}
	return {
		encrypt,
		decrypt,
	}
}