import type { Token } from '../token';
import type { HistoryData } from './HistoryData';

interface MeltData extends HistoryData {
	preimage: string;
	invoice: string;
	change: Array<Token>;
}

export type { MeltData };
