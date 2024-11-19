import type { Contact } from "$lib/db/models/types";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper } from "./helper/encryptionHelper";


const encryptionHelper = createEncryptionHelper<Contact>("encrypted-contacts")

const createContactsStore = () => {
    const initialContacts: Array<Contact> = [];
    const store = writable<Array<Contact>>(initialContacts);
    const {set, subscribe, update} = store;
    const {addMany, addOrUpdate, remove, clear ,init ,reEncrypt ,reset, getBy, getAllBy} = createDefaultStoreFunctions(encryptionHelper, store);

    return {addMany, set, subscribe, update, addOrUpdate, remove, init, reset, clear, reEncrypt, getBy, getAllBy};
}
export const contactsStore = createContactsStore();

