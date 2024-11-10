import type { StoredMintQuote } from "$lib/db/models/types";
import { MintQuoteState, type MintQuoteResponse} from "@cashu/cashu-ts";
import { get, writable } from "svelte/store";
import { createDefaultStoreFunctions } from "./helper/storeHelper";
import { createEncryptionHelper } from "./helper/encryptionHelper";
import { checkMintQuote, mintProofs } from "$lib/actions/actions";


const encryptionHelper = await createEncryptionHelper<StoredMintQuote>("encrypted-mint-quotes")

const createMintQuotesStore = () => {
    const initialMintQuotes: Array<StoredMintQuote> = [];
    const store = writable<Array<StoredMintQuote>>(initialMintQuotes);
    const defaults = createDefaultStoreFunctions(encryptionHelper, store);

    const getActiveQuotes = () => {
        return get(store).filter(q => q.state === MintQuoteState.UNPAID);
    }

    const getReadyForIssueQuotes = () => {
        return get(store).filter(q => q.state === MintQuoteState.PAID);
    }

    const createCheckMintQuotesInterval = (intervalMS: number) => {
        return setInterval(async ()=>{
            await checkActiveQuotes()
            await mintPaidQuotes()
        }, intervalMS)
    }

    const checkActiveQuotes =async ()=> {
        const actives = getActiveQuotes()
            for (const quote of actives) {
                const checked = await checkMintQuote(quote)
                if (checked.state==='PAID') {
                    await mintProofs(checked)
                }
            }
    }
    const mintPaidQuotes =async ()=> {
        const readys = getReadyForIssueQuotes()
            for (const quote of readys) {
                await mintProofs(quote)
            }
    }

    const interval = createCheckMintQuotesInterval(5000)

    const terminateInterval = () => {
        clearInterval(interval)
    }

    return {...store, ...defaults, getActiveQuotes, terminateInterval};
}
export const mintQuotesStore = createMintQuotesStore();

