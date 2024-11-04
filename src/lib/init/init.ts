import { countsStore } from "$lib/stores/persistent/counts"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { createMintsStore, mints } from "$lib/stores/persistent/mints"
import { proofsStore } from "$lib/stores/persistent/proofs"

export const init = async () => {
    await initStores()
}

const initStores = async () => {
    await mints.init()
    await mintQuotesStore.init()
    await proofsStore.init()
    await countsStore.init()
}