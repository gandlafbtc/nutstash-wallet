import { countsStore } from "$lib/stores/persistent/counts"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { createMintsStore, mints } from "$lib/stores/persistent/mints"
import { mnemonic } from "$lib/stores/persistent/mnemonic"
import { proofsStore } from "$lib/stores/persistent/proofs"
import { transactionsStore } from "$lib/stores/persistent/transactions"

export const init = async () => {
    await initStores()
}

const initStores = async () => {
    await mints.init()
    await transactionsStore.init()
    await mintQuotesStore.init()
    await proofsStore.init()
    await countsStore.init()
    await mnemonic.init()
}