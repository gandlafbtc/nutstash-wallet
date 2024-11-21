import type { Contact } from "$lib/db/models/types";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper } from "./helper/encryptionHelper";
import { npubEncode } from "nostr-tools/nip19";
import { NUTSTASH_PUBKEY } from "../static/const";


const encryptionHelper = createEncryptionHelper<Contact>("encrypted-contacts")

const createContactsStore = () => {
    const initialContacts: Array<Contact> = [];
    const store = writable<Array<Contact>>(initialContacts);
    const {set, subscribe, update} = store;
    const {addMany, addOrUpdate, remove, clear ,init: initialize,reEncrypt ,reset, getBy, getAllBy} = createDefaultStoreFunctions(encryptionHelper, store);

    const init = async () => {
        if(!get(store).length){
            const npub = npubEncode(NUTSTASH_PUBKEY)
            await addOrUpdate(npub, {
                alias: "Nutstash",
                npub,
                picture: '/maskable_icon_x192.png'
            },'npub')
        }
    }

    return {addMany, set, subscribe, update, addOrUpdate, remove, init, reset, clear, reEncrypt, getBy, getAllBy};
}
export const contactsStore = createContactsStore();

