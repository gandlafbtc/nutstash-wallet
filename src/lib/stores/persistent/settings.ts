import { browser } from '$app/environment';

import { get, writable } from 'svelte/store';
import { createEncryptionHelper } from './helper/encryptionHelper';
import type { Settings } from '$lib/db/models/types';
import { createDefaultStoreFunctions } from './helper/storeHelper';

const initialValue = window.localStorage.getItem('nutstash.unit') ?? 'sat';

export const unit = writable<string>(initialValue);

unit.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nutstash.unit', value);
	}
});


const DEFAULT_SETTINGS: Settings = {
	id: '0',
	contact: {

	},
	currency: {
		prefferedUnit: 'sat'
	},
	keys: {

	},
	mints: {

	},
	nostr: {
	},
	tokens: {
		autoReceive: false
	},
	general: {
		hideBalance: false
	}

}

const encryptionHelper = createEncryptionHelper<Settings>("encrypted-settings")

const createSettingsStore = () => {
	const initialSettings: Array<Settings> = [];
	const store = writable<Array<Settings>>(initialSettings);
	const { addOrUpdate, clear, init: initialize, reEncrypt, reset } = createDefaultStoreFunctions(encryptionHelper, store);

	const addDefaultSettings = async () => {
		await addOrUpdate(DEFAULT_SETTINGS.id, DEFAULT_SETTINGS, 'id')
	}

	const init = async () => {
		await initialize()
		if (!get(store).length) {
			await addDefaultSettings()
		}
	}
	
	const setHideBalance = async (value: boolean) => {
		const s = get(store)[0]
		s.general.hideBalance = value
		await addOrUpdate('0',s, 'id')
	} 

	const setAutoReceive = async (value: boolean) => {
		const s = get(store)[0]
		s.tokens.autoReceive = value
		await addOrUpdate('0',s, 'id')
	} 

	return { ...store, init, reset, clear, reEncrypt, setHideBalance, setAutoReceive };
}
export const settings = createSettingsStore();

