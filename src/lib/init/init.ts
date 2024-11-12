import { countsStore } from "$lib/stores/persistent/counts"
import { meltQuotesStore } from "$lib/stores/persistent/meltquotes"
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
    await meltQuotesStore.init()
    await proofsStore.init()
    await countsStore.init()
    await mnemonic.init()
}

export const reencrypt = async () => {
    await mints.reEncrypt()
    await transactionsStore.reEncrypt()
    await mintQuotesStore.reEncrypt()
    await meltQuotesStore.reEncrypt()
    await proofsStore.reEncrypt()
    await countsStore.reEncrypt()
    await mnemonic.reEncrypt()
}

export const setStoresFromBackupJSON = async (obj:any) => {
    mints.set(obj.mints)
    transactionsStore.set(obj.transactionsStore)
    mintQuotesStore.set(obj.mintQuotesStore)
    meltQuotesStore.set(obj.meltQuotesStore)
    proofsStore.set(obj.proofsStore)
    countsStore.set(obj.countsStore)
    mnemonic.set(obj.mnemonic)
}