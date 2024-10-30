import type { Token } from '../token';
import type { HistoryData } from './HistoryData';

interface MintData extends HistoryData {
	mintingHash: string;
	invoice: string;
	tokens: Array<Token>;
}

export type { MintData };
