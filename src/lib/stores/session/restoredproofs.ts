import type { Proof } from "@cashu/cashu-ts";
import { writable, type Writable } from "svelte/store";

export const restoredProofs: Writable<Proof[]> = writable<Proof[]>([])