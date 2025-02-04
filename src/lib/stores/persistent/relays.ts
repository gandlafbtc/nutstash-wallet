import type { Relay } from '$lib/db/models/types';
import { get, writable } from 'svelte/store';
import { createDefaultStoreFunctions } from './helper/storeHelper';
import { createEncryptionHelper } from './helper/encryptionHelper';

const DEFAULT_RELAYS = ['wss://relay.damus.io', 'wss://relay.primal.net'];

const encryptionHelper = createEncryptionHelper<Relay>('encrypted-relays');

const createRelaysStore = () => {
	const initialRelays: Array<Relay> = [];
	const store = writable<Array<Relay>>(initialRelays);
	const { set, subscribe, update } = store;
	const {
		add,
		addOrUpdate,
		remove,
		clear,
		init: initialize,
		reEncrypt,
		reset,
		getBy,
		getAllBy,
		addMany
	} = createDefaultStoreFunctions(encryptionHelper, store);

	const addDefaultRelays = async () => {
		await addMany(
			DEFAULT_RELAYS.map((r) => {
				return { url: r, isOn: true };
			})
		);
	};

	const init = async () => {
		await initialize();
		if (!get(store).length) {
			await addDefaultRelays();
		}
	};

	return {
		add,
		set,
		subscribe,
		update,
		addOrUpdate,
		remove,
		init,
		reset,
		clear,
		reEncrypt,
		getBy,
		getAllBy
	};
};
export const relaysStore = createRelaysStore();
