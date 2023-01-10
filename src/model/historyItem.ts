
interface HistoryItem {
    type: HistoryItemType,
    date: Date,
    amount: number,
    data: object 
}

enum HistoryItemType {
    SEND,
    RECEIVE,
    MINT,
    MELT,
  }

export type {HistoryItem}

export {HistoryItemType}