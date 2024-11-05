import type { StoredMintQuote } from "$lib/db/models/types"
import { countsStore } from "$lib/stores/persistent/counts"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { mints } from "$lib/stores/persistent/mints"
import { proofsStore } from "$lib/stores/persistent/proofs"
import { getCount } from "$lib/util/utils"
import { getWalletWithUnit } from "$lib/util/walletUtils"
import { get } from "svelte/store"

export const createMintQuote = async (mintUrl: string, amount : number, options?: {unit?: string}) => {
    const wallet = await getWalletWithUnit(get(mints), mintUrl, options?.unit)
    const quote = await wallet.createMintQuote(amount)
    if (!quote) {
        throw new Error(`Error when creating mint quote for ${mintUrl}`)
    }
    const quoteToStore = {...quote,createdAt: Date.now(), mintUrl, unit: options?.unit??'sat', amount}
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore , "quote")
    return quoteToStore
} 

export const checkMintQuote = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints),quote.mintUrl, quote.unit)
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    const quoteToStore = {...quote}
    if (quote.state !== updatedQuote.state) {
        quoteToStore.state = updatedQuote.state
        await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    }
    return quoteToStore
}

export const mintProofs = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints),quote.mintUrl, quote.unit)
    const quoteToStore = {...quote}

    let countStart = countsStore.getBy(wallet.keysetId, 'keysetId')
    let currentCount = 0
    if (countStart) {
       currentCount = countStart.count + 1
    }
    
    const proofs = await wallet.mintProofs(quote.amount, quote.quote, {counter: currentCount})
    
    await proofsStore.addMany(proofs.proofs)
    if (proofs?.proofs?.length) {
        let endCount = proofs.proofs.length
        endCount = endCount + currentCount
        await countsStore.addOrUpdate(wallet.keysetId, {keysetId: wallet.keysetId, count: endCount}, 'keysetId')
        quoteToStore.counts =  {keysetId: wallet.keysetId, counts: getCount(currentCount, endCount)}
    }
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    if (quote.state !== updatedQuote.state) {
        quoteToStore.state = updatedQuote.state
    }
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
}