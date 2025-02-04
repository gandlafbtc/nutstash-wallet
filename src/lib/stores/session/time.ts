import { writable } from 'svelte/store';

const createNowStore = () => {
	const store = writable(Date.now());

	setInterval(() => {
		store.set(Date.now());
	}, 1000);

	return store;
};

export const now = createNowStore();
