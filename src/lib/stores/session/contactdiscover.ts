import { createAlias } from "$lib/actions/nostr";
import type { Contact } from "$lib/db/models/types";
import { writable } from "svelte/store";


const createDiscoveredContactsStore = () => {
    const store = writable<Contact[]>([]);

    const add = (npub: string, alias?: string, picture?: string) => {
        store.update((context) => [...context, { npub, alias: alias?? createAlias(), picture }]);
    }

    return {...store, add}
}

export const discoveredContacts = createDiscoveredContactsStore()


