import type { Message } from "$lib/db/models/types";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper } from "./helper/encryptionHelper";


const encryptionHelper = createEncryptionHelper<Message>("encrypted-messages")

const createMessagesStore = () => {
    const initialMessages: Array<Message> = [];
    const store = writable<Array<Message>>(initialMessages);
    const {set, subscribe, update} = store;
    const {addOrUpdate, remove, clear ,init ,reEncrypt ,reset, getBy, getAllBy} = createDefaultStoreFunctions(encryptionHelper, store);

    return {set, subscribe, update, addOrUpdate, remove, init, reset, clear, reEncrypt, getBy, getAllBy};
}
export const messagesStore = createMessagesStore();

