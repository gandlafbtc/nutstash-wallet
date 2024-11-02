import { get, type Writable } from "svelte/store"
import type { EncryptionHelper } from "./encryptionHelper"

export const createDefaultStoreFunctions = <T>(encryptionHelper: EncryptionHelper<T[]>, store: Writable<T[]>) => {

    const init = async () => {
		const all = await encryptionHelper.decrypt()
		store.set(all)
	}

	const reEncrypt = async (value: T[]) => {
		store.set(value);
		await encryptionHelper.encrypt(get(store))
	}

	const reset = async () => {
		store.set([] as T[]);
		await encryptionHelper.encrypt(get(store))
	}

	const clear = () => {
		store.set([] as T[])
	}

	const remove = async (id: string, idFieldDescr : keyof T) => {
		store.update(context => context.filter(o => o[idFieldDescr] !== id))
		await encryptionHelper.encrypt(get(store))
	}

	const addOrUpdate = async (id: string, element: T, idFieldDescr : keyof T) => {
		if (get(store).find(o => o[idFieldDescr] === id)) {
			store.update(context => context.map(o => o[idFieldDescr] === id? element : o))
		}
		else {
			store.update(context => [element, ...context])
		}
		await encryptionHelper.encrypt(get(store))
	}

    return {
        init,
        remove,
        addOrUpdate,    
        clear,
        reset,  
        reEncrypt
    }
}