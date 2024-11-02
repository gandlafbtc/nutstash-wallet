import { writable } from "svelte/store";

export type StatusMessage = {

}

export const  statusMessage = writable<StatusMessage | undefined>();