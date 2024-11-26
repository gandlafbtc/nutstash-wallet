import { browser } from "$app/environment";
import { writable } from "svelte/store";

const initialSelctedMint = -1;

const initialSelctedMintString: string = window.localStorage.getItem('selected-mint') ?? JSON.stringify(initialSelctedMint)
	
const initialValueSelected: number = JSON.parse(initialSelctedMintString);

export const selectedMint = writable<number>(initialValueSelected);

selectedMint.subscribe(async (value) => {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('selected-mint', stringValue);
});

