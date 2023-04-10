import { writable } from "svelte/store";

const activeTab  = writable<string>('wallet')

export {activeTab}