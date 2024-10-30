import type { Token } from '../token';
import type { HistoryData } from './HistoryData';

interface ReceiveData extends HistoryData {
	encodedToken: string;
	receivedTokens: Array<Token>;
}

export type { ReceiveData };
