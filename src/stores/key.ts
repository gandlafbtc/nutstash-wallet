import { writable } from "svelte/store";

import { randomBytes, bytesToHex, hexToBytes } from "@noble/hashes/utils";

import { browser } from '$app/environment';


const initialValueSting: string = browser ? window.localStorage.getItem('key-iv') ?? bytesToHex(randomBytes(16)) : bytesToHex(randomBytes(16));

const initialValue: string = initialValueSting;

const iv = writable<Uint8Array>(hexToBytes(initialValue));

iv.subscribe((value) => {
	if (browser) {
        console.log(bytesToHex(value))
		window.localStorage.setItem('key-iv', bytesToHex(value));
	}
});

export { iv };


export let key = writable<CryptoKey|undefined>()