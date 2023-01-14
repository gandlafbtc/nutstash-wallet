import type { Token } from "../token"
import type { HistoryData } from "./HistoryData"

interface SendData extends HistoryData {
    encodedToken: string
    send: Array<Token>,
    returnChange: Array<Token>
}

export type { SendData }