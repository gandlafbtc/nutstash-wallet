import type { GetInfoResponse, MintKeys, MintKeyset } from '@cashu/cashu-ts';

interface Mint {
	mintURL: string;
	info?: GetInfoResponse;
	keys: Array<MintKeys>;
	keysets: Array<MintKeyset>;
}

export type { Mint };
