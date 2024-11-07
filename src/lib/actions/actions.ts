import { countsStore } from "$lib/stores/persistent/counts"
import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { mints } from "$lib/stores/persistent/mints"
import { pendingProofsStore, proofsStore } from "$lib/stores/persistent/proofs"
import { transactionsStore } from "$lib/stores/persistent/transactions"
import { getCount } from "$lib/util/utils"
import { getAmountForTokenSet, getWalletWithUnit } from "$lib/util/walletUtils"
import { getDecodedToken, type Proof, type Token } from "@cashu/cashu-ts"
import { get } from "svelte/store"
import { bytesToHex, randomBytes } from "@noble/hashes/utils"
import { TransactionStatus, TransactionType, type StoredMintQuote, type StoredTransaction } from "$lib/db/models/types"

export const createMintQuote = async (mintUrl: string, amount: number, options?: { unit?: string }) => {
    const wallet = await getWalletWithUnit(get(mints), mintUrl, options?.unit)
    const quote = await wallet.createMintQuote(amount)
    if (!quote) {
        throw new Error(`Error when creating mint quote for ${mintUrl}`)
    }
    const quoteToStore = { ...quote, createdAt: Date.now(), mintUrl, unit: options?.unit ?? 'sat', amount }
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    return quoteToStore
}

export const checkMintQuote = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    const quoteToStore = { ...quote }
    if (quote.state !== updatedQuote.state) {
        quoteToStore.state = updatedQuote.state
        await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
    }
    return quoteToStore
}

export const mintProofs = async (quote: StoredMintQuote) => {
    const wallet = await getWalletWithUnit(get(mints), quote.mintUrl, quote.unit)
    const quoteToStore = { ...quote }

    let currentCount = getCurrentCount(wallet.keysetId)

    const proofs = await wallet.mintProofs(quote.amount, quote.quote, { counter: currentCount })

    await proofsStore.addMany(proofs.proofs)
    if (proofs?.proofs?.length) {
        let endCount = proofs.proofs.length
        endCount = endCount + currentCount
        await updateCount(wallet.keysetId, endCount)
        quoteToStore.counts = { keysetId: wallet.keysetId, counts: getCount(currentCount, endCount) }
    }
    const updatedQuote = await wallet.checkMintQuote(quote.quote)
    if (quote.state !== updatedQuote.state) {
        quoteToStore.state = updatedQuote.state
    }
    await mintQuotesStore.addOrUpdate(quote.quote, quoteToStore, "quote")
}

export const receiveEcash = async (token: string | Token): Promise<{ untrustedMint?: string, proofs: Proof[] }> => {
    if (typeof token === "string") {
        try {
            token = getDecodedToken(token)
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
    const mint = mints.getBy(token.mint, 'url')
    if (!mint) {
        return { untrustedMint: token.mint, proofs: [] }
    }
    const wallet = await getWalletWithUnit(get(mints), token.mint, token.unit)
    const currentCount = getCurrentCount(wallet.keysetId)
    const proofs = await wallet.receive(token, { counter: currentCount })
    let endCount = currentCount
    if (proofs?.length) {
        await proofsStore.addMany(proofs)
        endCount = endCount +proofs.length 
        await updateCount(wallet.keysetId, endCount)
    }
    const transactionToAdd: StoredTransaction = {
        id: bytesToHex(randomBytes(12)),
        type: TransactionType.SEND,
        in: token.proofs,
        out: proofs,
        mint: token.mint,
        unit: token.unit,
        createdAt: Date.now(),
        amount: getAmountForTokenSet(token.proofs),
        counts: {keysetId: wallet.keysetId, counts: getCount(currentCount, endCount)},
        status: TransactionStatus.COMPLETED,
        fees: getAmountForTokenSet(token.proofs)-getAmountForTokenSet(proofs)
    }

    await transactionsStore.addOrUpdate(transactionToAdd.id, transactionToAdd, 'id')
    return { proofs }

}

export const sendEcash = async (mintUrl: string, amount: number, unit?: string) => {
    const wallet = await getWalletWithUnit(get(mints), mintUrl, unit)
    const mintUnitProofs = proofsStore.getByKeysetIds(wallet.keysets.map((ks) => ks.id))
    const currentCount = getCurrentCount(wallet.keysetId)
    const { send, keep } = await wallet.send(amount, mintUnitProofs, { counter: currentCount })
    const mintUnitProofIds =mintUnitProofs.map((p) => p.secret)
    await proofsStore.removeMany(mintUnitProofIds, 'secret')
    await proofsStore.addMany(keep)
    await pendingProofsStore.addMany(send)
    const newKeepProofCount = keep.reduce((acc, p) => mintUnitProofIds.includes(p.id)? acc : acc + 1, 0) 
    const newSendProofCount = send.reduce((acc, p) => mintUnitProofIds.includes(p.id)? acc : acc + 1, 0) 
    let endCount = newSendProofCount + newKeepProofCount
    endCount = endCount + currentCount
    await updateCount(wallet.keysetId, endCount)
    
    const keepIds = keep.map((p) => p.id)

    const transactionToAdd: StoredTransaction = {
        id: bytesToHex(randomBytes(12)),
        type: TransactionType.SEND,
        mint: mintUrl,
        amount,
        in: mintUnitProofs.filter((p)=> !keepIds.includes(p.id)),
        out: send,
        change: keep,
        createdAt: Date.now(),
        counts: {keysetId: wallet.keysetId, counts: getCount(currentCount, endCount)},
        status: TransactionStatus.PENDING,
        fees: getAmountForTokenSet(mintUnitProofs)-(getAmountForTokenSet(keep)+getAmountForTokenSet(send))
    }

    await transactionsStore.addOrUpdate(transactionToAdd.id, transactionToAdd, 'id')
    return { send, keep, txId: transactionToAdd.id }
}


const getCurrentCount = (ksId: string) => {
    const countStart = countsStore.getBy(ksId, 'keysetId')
    let currentCount = 0
    if (countStart) {
        currentCount = countStart.count + 1
    }
    return currentCount
}

const updateCount = async (ksId: string, endCount: number) => {
    await countsStore.addOrUpdate(ksId, { keysetId: ksId, count: endCount }, 'keysetId')
}