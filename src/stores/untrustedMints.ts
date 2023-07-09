import { writable } from "svelte/store";
import type { Mint } from "../model/mint";

const untrustedMints = writable<Array<Mint>>([]);

export {untrustedMints}