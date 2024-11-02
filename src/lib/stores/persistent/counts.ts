import { DB } from '$lib/db/db';
import { randDBKey } from '$lib/db/helper';
import type { KeysetCount } from '$lib/db/models/types';

import { writable } from 'svelte/store';


const createCountsStore = async () =>{

	const store = writable<KeysetCount[]>([]);
	const {set, update ,subscribe} = store

	return {
		subscribe,
		set,
		update,
	}
}
export const counts = await createCountsStore()

