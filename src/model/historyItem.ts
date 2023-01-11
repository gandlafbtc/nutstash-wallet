
interface HistoryItem {
    type: HistoryItemType,
    date: number,
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