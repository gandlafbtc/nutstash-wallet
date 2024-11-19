import type { KeyPair } from "$lib/db/models/types";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper, type EncryptionHelper } from "./helper/encryptionHelper";
import {  getPublicKey } from "nostr-tools";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { seed } from "./mnemonic";
import { HDKey } from "@scure/bip32";

const STANDARD_DERIVATION_PATH = `m/129372'/0'`;
const NOSTR_KEYS_PATH = `10101010`;

const keysEncryptionHelper = createEncryptionHelper<KeyPair>("encrypted-keys")

const createKeysStore = (encryptionHelper: EncryptionHelper<KeyPair>, keysId: number) => {
    const initialKeys: Array<KeyPair> = [];
    const store = writable<Array<KeyPair>>(initialKeys);
    const { set, subscribe, update } = store;
    const { addOrUpdate, remove, clear, init: initialize, reEncrypt, reset, getBy, getAllBy, add } = createDefaultStoreFunctions(encryptionHelper, store);


    const createNewKeypair = async () => {
        const counters = get(store).map(kp => kp.counter)
        let largest = -1;

        for (let i = 0; i < counters.length; i++) {
            if (counters[i] > largest) {
                largest = counters[i];
            }
        }

        largest++

        const hdkey = HDKey.fromMasterSeed(get(seed));
        const derivationPath = `${STANDARD_DERIVATION_PATH}/${NOSTR_KEYS_PATH}'/${keysId}'/${largest}`;
        const sk = hdkey.derive(derivationPath).privateKey;
        if (!sk) {
            throw new Error('Could not derive private key');
        }
        const pk = getPublicKey(sk)
        await add({
            counter: largest,
            publicKey: '02'+pk,
            privateKey: bytesToHex(sk)
        })
        return { publicKey: pk, privateKey: bytesToHex(sk) }
    }

    const addKey = async (privKey: string) => {
        const pub = getPublicKey(hexToBytes(privKey))
        await add({
            counter: -1,
            publicKey: '02'+pub,
            privateKey: privKey
         })
        return { publicKey: pub, privateKey: privKey }
    }



    const init = async () => {
        await initialize()
        if (!get(store).length) {
            await createNewKeypair()
        }
    }

    return { set, subscribe, update, addOrUpdate, remove, init, reset, clear, reEncrypt, getBy, getAllBy, createNewKeypair, addKey };
}
export const keysStore = createKeysStore(keysEncryptionHelper, 0);

