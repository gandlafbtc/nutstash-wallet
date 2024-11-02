import { browser } from "$app/environment";
import { MeltQuoteState, type MeltQuoteResponse, type MintQuoteResponse } from "@cashu/cashu-ts";
import { get, writable } from "svelte/store";



const createMeltQuotesStore = () => {
    const initialMeltQuotes: Array<MeltQuoteResponse> = [];
    
    const initialMeltQuoteString: string = browser
	? window.localStorage.getItem('melt-quotes') ?? JSON.stringify(initialMeltQuotes)
	: JSON.stringify(initialMeltQuotes);
    
    const initialMeltValue: Array<MeltQuoteResponse> = JSON.parse(initialMeltQuoteString);
    
    const store= writable<Array<MeltQuoteResponse>>(initialMeltValue);
    const {set, subscribe, update}  = store;
    subscribe(async (value) => {
        if (browser) {
            const stringValue = JSON.stringify(value);
            window.localStorage.setItem('melt-quotes', stringValue);
        }
    });

    const add = (quote: MeltQuoteResponse) => {
        update(context => [quote,...context]);
    }

    const remove = (quoteId: string) => {
        update(context => context.filter(q => q.quote !== quoteId));
    }

    const updateOne = (newQuote: MeltQuoteResponse)  => {
        update(context => context.map(q => {
            if (q.quote === newQuote.quote) {
                return newQuote;
            }
            return q;
        }));
    }

    const getActiveQuotes = () => {
        return get(store).filter(q => q.state === MeltQuoteState.UNPAID && q.expiry > Date.now());
    }

    return {set, subscribe, update, add, remove, updateOne, getActiveQuotes };
}
export const meltQuotesStore = createMeltQuotesStore();

