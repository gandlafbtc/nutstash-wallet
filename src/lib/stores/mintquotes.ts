import { browser } from "$app/environment";
import { MintQuoteState, type MintQuoteResponse} from "@cashu/cashu-ts";
import { get, writable } from "svelte/store";



const createMintQuotesStore = () => {
    const initialMintQuotes: Array<MintQuoteResponse> = [];
    
    const initialMintQuoteString: string = browser
	? window.localStorage.getItem('mint-quotes') ?? JSON.stringify(initialMintQuotes)
	: JSON.stringify(initialMintQuotes);
    
    const initialMintValue: Array<MintQuoteResponse> = JSON.parse(initialMintQuoteString);
    
    const store = writable<Array<MintQuoteResponse>>(initialMintValue);
    const {set, subscribe, update} = store;
    subscribe(async (value) => {
        if (browser) {
            const stringValue = JSON.stringify(value);
            window.localStorage.setItem('mint-quotes', stringValue);
        }
    });

    const add = (quote: MintQuoteResponse) => {
        update(context => [quote,...context]);
    }

    const remove = (quoteId: string) => {
        update(context => context.filter(q => q.quote !== quoteId));
    }

    const getActiveQuotes = () => {
        return get(store).filter(q => q.state === MintQuoteState.UNPAID && q.expiry > Date.now());
    }

    const updateOne = (newQuote: MintQuoteResponse)  => {
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

