interface HistoryItem<HistoryData> {
	type: HistoryItemType;
	date: number;
	amount: number;
	data: HistoryData;
}

enum HistoryItemType {
	SEND,
	RECEIVE,
	RECEIVE_NOSTR,
	MINT,
	MELT
}

export type { HistoryItem };

export { HistoryItemType };
