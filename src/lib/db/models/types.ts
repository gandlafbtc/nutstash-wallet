import type { MeltQuoteResponse, MintQuoteResponse, Proof as CashuProof, Token, MintQuoteState, MeltQuoteState } from "@cashu/cashu-ts";
import type { GetInfoResponse, MintActiveKeys, MintAllKeysets, MintKeys, MintKeyset } from '@cashu/cashu-ts';

export enum EXPIRED  {
    EXPIRED = "EXPIRED"
    }

export type StoredMintQuote = Omit<MintQuoteResponse,'state'> & {
    state: MintQuoteState | EXPIRED
    mintUrl: string,
    unit: string,
    amount: number
    createdAt: number
    lastChangedAt: number
    type: 'mint'
    out?: Proof[]
    counts?: {keysetId: string, counts:number[]
    } 
};

export type StoredMeltQuote = Omit<MeltQuoteResponse, 'state'> & { 
    state: MeltQuoteState | EXPIRED
    mintUrl: string,
    unit: string,
    createdAt: number,
    lastChangedAt: number,
    type: 'melt'
    in?: Proof[]
    out?: Proof[]
    request: string
    fees?: number
    counts?: {keysetId: string, counts:number[]} };

export type StoredTransaction = {
    id: string;
    type: TransactionType;
    in: Proof[]
    out: Proof[]
    change?: Proof[]
    mintUrl: string
    state: TransactionStatus
    createdAt: number
    lastChangedAt: number
    amount: number
    unit?: string
    counts?: {keysetId: string, counts:number[]}
    address?: string
    fees?: number
    memo?: string
 };

 export enum TransactionType {
    SEND="send",
    RECEIVE="receive",
 }

 export enum TransactionStatus {
    PENDING="pending",
    COMPLETED="completed",
 }

export type Contact = {

}

export type KeysetCount = { keysetId: string; count: number }

export type Proof = CashuProof

export type StoredSeed = {
    mnemonic : string;
}


export type EncryptedStore = {
    cypher: Uint8Array
    iv: string
    t: number
    // preimage: hex
}

export type Message = {
    type: MessageType;
    date: number;
    isRead: boolean;
    data: MessageData;
}

export enum MessageType {
    NOSTR,

}

export type MessageData = {
    content: string;
    title?: string;
    event?: string;
}

export type Mint = {
    url: string;
    keys: MintActiveKeys;
    keysets: MintAllKeysets;
    info: GetInfoResponse;
}

export type NostrRelay = {
    url: string;
    isActive: boolean;
}

export type Settings = {
    mintSettings: MintSettings;
    currencySettings: CurrencySettings;
    keySettings: KeySettings;
    nostrSettings: NostrSettings;
    tokenSettings: TokenSettings;
    contactSettings: ContactSettings;
}

export type MintSettings = {
    fetchMintsOnStartup: boolean;
}

export type CurrencySettings = {
    preferedCurrency: string;
}

export type KeySettings = {
    useSingleReceiveKey: boolean;
    useSingleSendKey: boolean;
}

export type NostrSettings = {
    useNostr: boolean;
    useExternalNostr: boolean;
}

export type TokenSettings = {
    tokenCheckMode: TokenCheckMode
}

export enum TokenCheckMode {
    SIMPLE,
    MANUAL,
    PENDING_ONLY,
    AUTO
}

export type ContactSettings = {

}