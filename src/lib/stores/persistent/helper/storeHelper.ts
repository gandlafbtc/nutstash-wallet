import { get, type Writable } from 'svelte/store';
import type { EncryptionHelper } from './encryptionHelper';
import { getHostFromUrl } from '$lib/util/utils';
import type { Mint } from '$lib/db/models/types';

export const createDefaultStoreFunctions = <T>(
	encryptionHelper: EncryptionHelper<T>,
	store: Writable<T[]>
) => {
	const init = async () => {
		try {
			const all = await encryptionHelper.decrypt();
			if (all?.length === 0) {
				store.set([]);
				return;
			}
			store.set(all);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const reEncrypt = async () => {
		await encryptionHelper.encrypt(get(store));
	};

	const reset = async () => {
		store.set([] as T[]);
		await encryptionHelper.encrypt(get(store));
	};

	const clear = () => {
		store.set([] as T[]);
	};

	const remove = async (id: string, idFieldDescr: keyof T) => {
		store.update((context) => context.filter((o) => o[idFieldDescr] !== id));
		await encryptionHelper.encrypt(get(store));
	};

	const addOrUpdateMany = async (elements: T[], idFieldDescr: keyof T) => {
		for (const element of elements) {
			if (get(store).find((o) => o[idFieldDescr] === element[idFieldDescr])) {
				store.update((context) =>
					context.map((o) => (o[idFieldDescr] === element[idFieldDescr] ? element : o))
				);
			} else {
				store.update((context) => [element, ...context]);
			}
		}
		await encryptionHelper.encrypt(get(store));
	};

	const addOrUpdate = async (id: string, element: T, idFieldDescr: keyof T) => {
		if (get(store).find((o) => o[idFieldDescr] === id)) {
			store.update((context) => context.map((o) => (o[idFieldDescr] === id ? element : o)));
		} else {
			store.update((context) => [element, ...context]);
		}
		await encryptionHelper.encrypt(get(store));
	};

	const addMany = async (elements: T[]) => {
		store.update((context) => [...elements, ...context]);
		await encryptionHelper.encrypt(get(store));
	};
	const add = async (o: T) => {
		store.update((context) => [o, ...context]);
		await encryptionHelper.encrypt(get(store));
	};

	const removeMany = async (ids: string[], idFieldDescr: keyof T) => {
		store.update((context) => context.filter((o) => !ids.includes(o[idFieldDescr] as string)));
		await encryptionHelper.encrypt(get(store));
	};

	const getBy = (id: string, idFieldDescr: keyof T): T | undefined => {
		return get(store).find((o) => o[idFieldDescr] === id);
	};

	const getAllBy = (ids: string[], idFieldDescr: keyof T): T[] => {
		return get(store).filter((o) => {
			return ids.includes(o[idFieldDescr] as string);
		});
	};

	return {
		init,
		remove,
		addOrUpdate,
		clear,
		reset,
		reEncrypt,
		getBy,
		getAllBy,
		addMany,
		add,
		removeMany,
		addOrUpdateMany
	};
};

export const getBy = <T>(array: T[], id: string, idFieldDescr: keyof T): T | undefined => {
	return array.find((o) => o[idFieldDescr] === id);
};

export const getByMany = <T>(array: T[], id: string[], idFieldDescr: keyof T): T[] => {
	return array.filter((o) => id.includes(o[idFieldDescr] as string));
};

///////////// Mint

export const getByHost = (array: Mint[], host: string): Mint | undefined => {
	return array.find((m) => host === getHostFromUrl(m.url));
};
