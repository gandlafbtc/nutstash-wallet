import type { GetInfoResponse, MintActiveKeys, MintAllKeysets, MintKeys, MintKeyset } from '@cashu/cashu-ts';

interface Mint {
	mintURL: string;
	keys: MintActiveKeys;
	keysets: MintAllKeysets;
	info: GetInfoResponse;
}

export type { Mint };
