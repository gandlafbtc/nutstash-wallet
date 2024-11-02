import { writable } from "svelte/store";

export const scannedTokenStore= writable<string|undefined>()
export const scannedInvoiceStore= writable<string|undefined>()
export const scannedLNURLStore= writable<string|undefined>()