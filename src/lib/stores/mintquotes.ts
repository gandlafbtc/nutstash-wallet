import { browser } from "$app/environment";
import { MintQuoteState, type MintQuoteResponse} from "@cashu/cashu-ts";
import { get, writable } from "svelte/store";

export type StoredMintQuote = MintQuoteResponse & { mintUrl: string, unit: string, amount: number, createdAt: number };

const createMintQuotesStore = () => {
    const initialMintQuotes: Array<StoredMintQuote & {}> = [];
    
    const initialMintQuoteString: string = browser
	? window.localStorage.getItem('mint-quotes') ?? JSON.stringify(initialMintQuotes)
	: JSON.stringify(initialMintQuotes);
    
    const initialMintValue: Array<StoredMintQuote> = JSON.parse(initialMintQuoteString);
    
    const store = writable<Array<StoredMintQuote>>(initialMintValue);
    const {set, subscribe, update} = store;
    subscribe(async (value) => {
        if (browser) {
            const stringValue = JSON.stringify(value);
            window.localStorage.setItem('mint-quotes', stringValue);
        }
    });

    const add = (quote: StoredMintQuote) => {
        update(context => [quote,...context]);
    }

    const remove = (quoteId: string) => {
        update(context => context.filter(q => q.quote !== quoteId));
    }

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

    return {set, subscribe, update, add, remove, updateOne, getActiveQuotes};
}
export const mintQuotesStore = createMintQuotesStore();

