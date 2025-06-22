import { writable } from 'svelte/store';

export let openReceiveDrawer = writable(false);
export let openSendDrawer = writable(false);
export let openScannerDrawer = writable(false);
export let openScanNFCDrawer = writable(false);
export let openWriteNFCDrawer = writable(false);
export let openListenSoundDrawer = writable(false);
export let openEmitSoundDrawer = writable(false);
export let openNpubDrawer = writable(false);