import { writable } from "svelte/store";

const initial: "true" | "false" | undefined = window.localStorage.getItem('use-password')

const getInitial = (initial: "true" | "false" | undefined) => {
	switch (initial) {
	case "true":
		return true;
	case "false":
		return false;
	default:
		return undefined;
}
}

export let usePassword = writable<boolean | undefined>(
	getInitial(initial),
);

usePassword.subscribe(async (value) => {
		const stringValue = JSON.stringify(value);
		window.localStorage.setItem('use-password', stringValue);
});