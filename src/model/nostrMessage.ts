import type { Token } from "./token"
import  type { Event } from "nostr-tools";
interface NostrMessage {
    event: Event
    token: Array<Token> 
    isAccepted: boolean
}

export type {NostrMessage}