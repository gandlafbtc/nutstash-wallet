import type { GetInfoResponse, MintKeys } from '@cashu/cashu-ts';

interface Mint {
	mintURL: string;
	info: GetInfoResponse
	keys: MintKeys;
	keysets: Array<string>;
}

export type { Mint };
