import type { Token } from "../token"
import type { HistoryData } from "./HistoryData"

interface ReceiveNostrData extends HistoryData {
        receivedTokens: Array<Token>,
        sender: string
        eventId: string
}

export type { ReceiveNostrData }