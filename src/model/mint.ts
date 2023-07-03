import type { MintKeys } from '@cashu/cashu-ts/dist/lib/es5/model/types';

interface Mint {
	mintURL: string;
	keys: MintKeys;
	keysets: Array<string>;
}

export type { Mint };
