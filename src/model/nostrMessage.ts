import type { Token } from "./token"
import  type { Event } from "nostr-tools";
interface NostrMessage {
    event: Event
    token: {proofs: Array<Token>, mints : Array<{url:string, ids:Array<string>}>}
    isAccepted: boolean
}

export type {NostrMessage}