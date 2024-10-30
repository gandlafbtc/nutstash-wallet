import type { GetInfoResponse, MintKeys, MintKeyset } from '@cashu/cashu-ts';

interface Mint {
	mintURL: string;
	keys: Map<string, MintKeys>;
	keysets: Array<MintKeyset>;
	info: GetInfoResponse;
}

export type { Mint };
