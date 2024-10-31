import { mintQuotesStore } from "$lib/stores/mintquotes"
import { mints } from "$lib/stores/mints"

export const createMintQuote = async (mintUrl: string, amount : number, options?: {unit?: string}) => {
    const wallet = mints.getWalletWithUnit(mintUrl, options?.unit)
    const quote = await wallet?.createMintQuote(amount)
    if (!quote) {
        throw new Error(`Error when creating mint quote for ${mintUrl}`)
    }
    mintQuotesStore.add({...quote,createdAt: Date.now(), mintUrl, unit: options?.unit??'sat', amount})
} 