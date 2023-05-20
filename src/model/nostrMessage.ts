import type { Proof } from "@cashu/cashu-ts";
import type { Event } from 'nostr-tools';
interface NostrMessage {
	event: Event;
	token: { token: { proofs: Proof[]; mint: string }[]; memo?: string };
	isAccepted: boolean;
}

export type { NostrMessage };
