export {};
declare global {
	interface Window {
		nostr: any; // this will be your variable name
	}
}

export interface Props {
	data: any[];
	children: Snippet;
	row: Snippet<[any]>;
}