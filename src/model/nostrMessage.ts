import type { Token } from './token';
import type { Event } from 'nostr-tools';
interface NostrMessage {
	event: Event;
	token: { token: [{ proofs: Array<Token>; mint: string }]; memo?: string };
	isAccepted: boolean;
}

export type { NostrMessage };
