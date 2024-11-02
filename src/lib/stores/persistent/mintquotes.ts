import { browser } from "$app/environment";
import type { StoredMintQuote } from "$lib/db/models/types";
import { MintQuoteState, type MintQuoteResponse} from "@cashu/cashu-ts";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper } from "./helper/encryptionHelper";


const encryptionHelper = await createEncryptionHelper<StoredMintQuote>("encrypted-mint-quotes")

const createMintQuotesStore = () => {
    const initialMintQuotes: Array<StoredMintQuote> = [];
    const store = writable<Array<StoredMintQuote>>(initialMintQuotes);
    const {set, subscribe, update} = store;
    const {addOrUpdate, remove, clear ,init ,reEncrypt ,reset} = createDefaultStoreFunctions(encryptionHelper, store);

    const getActiveQuotes = () => {
        return get(store).filter(q => q.state === MintQuoteState.UNPAID && q.expiry > Date.now());
    }

    const updateOne = (newQuote: StoredMintQuote)  => {
        update(context => context.map(q => {
            if (q.quote === newQuote.quote) {
                return newQuote;
            }
            return q;
        }));
    }

    return {set, subscribe, update, addOrUpdate, remove, updateOne, getActiveQuotes, init, reset , clear , reEncrypt};
}
export const mintQuotesStore = createMintQuotesStore();

