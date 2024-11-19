import type { KeyPair, NWCConnection } from "$lib/db/models/types";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper, type EncryptionHelper } from "./helper/encryptionHelper";


const nwcKeysEncryptionHelper = createEncryptionHelper<NWCConnection>("encrypted-nwc-keys")

const createKeysStore = (encryptionHelper: EncryptionHelper<NWCConnection>, keysId: number) => {
    const initialKeys: Array<NWCConnection> = [];
    const store = writable<Array<NWCConnection>>(initialKeys);
    const { set, subscribe, update } = store;
    const { addOrUpdate, remove, clear, init, reEncrypt, reset, getBy, getAllBy, add } = createDefaultStoreFunctions(encryptionHelper, store);

    return { set, subscribe, update, addOrUpdate, remove, init, reset, clear, reEncrypt, getBy, getAllBy };
}

export const nwcKeysStore = createKeysStore(nwcKeysEncryptionHelper, 1);

