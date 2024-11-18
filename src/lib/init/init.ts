import { connectNostrRelays } from "$lib/actions/nostr"
import { contactsStore } from "$lib/stores/persistent/contacts"
import { messagesStore } from "$lib/stores/persistent/contacts copy"
import { countsStore } from "$lib/stores/persistent/counts"
import { keysStore } from "$lib/stores/persistent/keys"
import { meltQuotesStore } from "$lib/stores/persistent/meltquotes"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { createMintsStore, mints } from "$lib/stores/persistent/mints"
import { mnemonic } from "$lib/stores/persistent/mnemonic"
import { offlineProofsStore, pendingProofsStore, proofsStore, spentProofsStore } from "$lib/stores/persistent/proofs"
import { transactionsStore } from "$lib/stores/persistent/transactions"

export const init = async () => {
    await initStores()
    await initNostrConnections()
}

const initNostrConnections = async () => {
    await connectNostrRelays()
}

const initStores = async () => {
    await mints.init()
    await transactionsStore.init()
    await mintQuotesStore.init()
    await meltQuotesStore.init()
    await proofsStore.init()
    await offlineProofsStore.init()
    await pendingProofsStore.init()
    await spentProofsStore.init()
    await keysStore.init()
    await countsStore.init()
    await mnemonic.init()
    await messagesStore.init()
    await contactsStore.init()
}

export const reencrypt = async () => {
    await mints.reEncrypt()
    await transactionsStore.reEncrypt()
    await mintQuotesStore.reEncrypt()
    await meltQuotesStore.reEncrypt()
    await proofsStore.reEncrypt()
    await offlineProofsStore.reEncrypt()
    await pendingProofsStore.reEncrypt()
    await spentProofsStore.reEncrypt()
    await keysStore.reEncrypt()
    await countsStore.reEncrypt()
    await mnemonic.reEncrypt()
    await messagesStore.reEncrypt()
    await contactsStore.reEncrypt()
}

export const setStoresFromBackupJSON = async (obj:any) => {
    mints.set(obj.mints)
    transactionsStore.set(obj.transactionsStore)
    mintQuotesStore.set(obj.mintQuotesStore)
    meltQuotesStore.set(obj.meltQuotesStore)
    proofsStore.set(obj.proofsStore)
    offlineProofsStore.set(obj.offlineProofsStore)
    pendingProofsStore.set(obj.pendingProofsStore)
    spentProofsStore.set(obj.spentProofsStore)
    keysStore.set(obj.keysStore)
    countsStore.set(obj.countsStore)
    mnemonic.set(obj.mnemonic)
    messagesStore.set(obj.messagesStore)
    contactsStore.set(obj.contactsStore)
}