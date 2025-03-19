import type {
	MeltQuoteResponse,
	MintQuoteResponse,
	Proof as CashuProof,
	Token,
	MintQuoteState,
	MeltQuoteState,
	PaymentRequest,
	RawPaymentRequest,
	PaymentRequestTransport
} from '@cashu/cashu-ts';
import type {
	GetInfoResponse,
	MintActiveKeys,
	MintAllKeysets,
	MintKeys,
	MintKeyset
} from '@cashu/cashu-ts';
import type { Event } from 'nostr-tools';

export enum EXPIRED {
	EXPIRED = 'EXPIRED'
}

export type StoredSwap = {
	mintQuoteId: string;
	meltQuoteId: string;
};

export type StoredMintQuote = Omit<MintQuoteResponse, 'state'> & {
	state: MintQuoteState | EXPIRED;
	mintUrl: string;
	unit: string;
	amount: number;
	createdAt: number;
	lastChangedAt: number;
	type: 'mint';
	out?: Proof[];
	counts?: {
		keysetId: string;
		counts: number[];
	};
};

export type StoredMeltQuote = Omit<MeltQuoteResponse, 'state'> & {
	state: MeltQuoteState | EXPIRED;
	mintUrl: string;
	unit: string;
	createdAt: number;
	lastChangedAt: number;
	type: 'melt';
	in?: Proof[];
	out?: Proof[];
	request: string;
	fees?: number;
	counts?: { keysetId: string; counts: number[] };
};

export type StoredTransaction = {
	id: string;
	type: TransactionType;
	in: Proof[];
	out: Proof[];
	change?: Proof[];
	mintUrl: string;
	state: TransactionStatus;
	createdAt: number;
	lastChangedAt: number;
	amount: number;
	unit?: string;
	counts?: { keysetId: string; counts: number[] };
	address?: string;
	fees?: number;
	memo?: string;
};

export type SimplePaymentRequest = {
	transport: Array<PaymentRequestTransport>;
	id?: string;
	amount?: number;
	unit?: string;
	mints?: Array<string>;
	description?: string;
	singleUse?: boolean;
};

export type StoredPaymentRequest = SimplePaymentRequest & {
	createdAt: number;
	lastChangedAt: number;
};

export enum TransactionType {
	SEND = 'send',
	RECEIVE = 'receive',
	OFFLINE =  'offline'
}

export enum TransactionStatus {
	PENDING = 'pending',
	COMPLETED = 'completed'
}

export type Contact = {
	npub: string;
	alias: string;
	picture?: string;
};

export type KeysetCount = { keysetId: string; count: number };

export type Proof = CashuProof;

export type StoredSeed = {
	mnemonic: string;
};

export type Relay = {
	url: string;
	isOn: boolean;
	hasConnection?: boolean;
};

export type NWCConnection = {
	counter: number;
	isActive: boolean;
	walletPublicKey: string;
	walletPrivateKey: string;
	connectionSecret: string;
	connectionPublicKey: string;
	allowanceLeft: number;
};

export type EncryptedStore = {
	cypher: Uint8Array;
	iv: string;
	t: number;
	// preimage: hex
};

export type Message = Event & {
	wrapId: string;
	isRead?: boolean;
	isToken?: boolean;
	isReceived?: boolean;
};

export type Mint = {
	url: string;
	keys: MintActiveKeys;
	keysets: MintAllKeysets;
	info: GetInfoResponse;
};

export type NostrRelay = {
	url: string;
	isActive: boolean;
};

export type Settings = {
	id: string;
	mints: {};
	currency: {
		prefferedUnit: string;
	};
	keys: {};
	nostr: {};
	tokens: {
		autoReceive: boolean;
	};
	contact: {};
	general: {
		hideBalance: boolean;
	};
};

export type KeyPair = {
	counter: number;
	publicKey: string;
	privateKey: string;
};

export enum TokenCheckMode {
	SIMPLE,
	MANUAL,
	PENDING_ONLY,
	AUTO
}

export type ContactSettings = {};
