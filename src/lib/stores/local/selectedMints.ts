import { browser } from "$app/environment";
import { writable } from "svelte/store";

const initialSelctedMints: Array<string> = [];

const initialSelctedMintsString: string = window.localStorage.getItem('selected-mints') ?? JSON.stringify(initialSelctedMints)
	
const initialValueSelected: Array<string> = JSON.parse(initialSelctedMintsString);

export const selectedMints = writable<Array<string>>(initialValueSelected);

selectedMints.subscribe(async (value) => {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('selected-mints', stringValue);
});

