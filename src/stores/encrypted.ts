import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValueString: string = browser
	? window.localStorage.getItem('encrypted-tokens') ?? ''
	: '';

const encryptedTokensStore = writable<string>(initialValueString);

encryptedTokensStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-tokens', value);
	}
});

const initialValueStringSpent: string = browser
	? window.localStorage.getItem('encrypted-spent-tokens') ?? ''
	: '';

const encryptedSpentTokensStore = writable<string>(initialValueStringSpent);

encryptedSpentTokensStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-spent-tokens', value);
	}
});

const initialValueStringOffline: string = browser
	? window.localStorage.getItem('encrypted-offline-tokens') ?? ''
	: '';

const encryptedOfflineTokensStore = writable<string>(initialValueStringOffline);

encryptedOfflineTokensStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-offline-tokens', value);
	}
});

const initialValuePendng: string = browser
	? window.localStorage.getItem('encrypted-pending-tokens') ?? ''
	: '';

const encryptedPendingTokensStore = writable<string>(initialValuePendng);

encryptedPendingTokensStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-pending-tokens', value);
	}
});

const initialValueNostr: string = browser
	? window.localStorage.getItem('encrypted-nostr-keys') ?? ''
	: '';

const encryptedNostrKeysStore = writable<string>(initialValueNostr);

encryptedNostrKeysStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-nostr-keys', value);
	}
});

const initialValueStringSeed: string = browser
	? window.localStorage.getItem('encrypted-seed') ?? ''
	: '';

const encryptedSeedStore = writable<string>(initialValueStringSeed);

encryptedSeedStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('encrypted-seed', value);
	}
});

export {
	encryptedTokensStore,
	encryptedSeedStore,
	encryptedSpentTokensStore,
	encryptedOfflineTokensStore,
	encryptedPendingTokensStore,
	encryptedNostrKeysStore
};
