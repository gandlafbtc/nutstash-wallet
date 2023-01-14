interface HistoryItem<HistoryData> {
    type: HistoryItemType,
    date: number,
    amount: number,
    data: HistoryData
}

enum HistoryItemType {
    SEND,
    RECEIVE,
    MINT,
    MELT,
  }

export type {HistoryItem}

export {HistoryItemType}