import { browser } from '$app/environment';

import { writable } from 'svelte/store';
import type { MintRequest } from '../model/mintReq';

const initialMint: Array<MintRequest> = [];

const initialValueSting: string = browser
	? window.localStorage.getItem('mint-requests') ?? JSON.stringify(initialMint)
	: JSON.stringify(initialMint);

const initialValue: Array<MintRequest> = JSON.parse(initialValueSting);

const mintRequests = writable<Array<MintRequest>>(initialValue);

mintRequests.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('mint-requests', JSON.stringify(value));
	}
});

export { mintRequests };
