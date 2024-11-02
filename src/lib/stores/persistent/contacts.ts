import { DB } from '$lib/db/db';
import { randDBKey } from '$lib/db/helper';
import type { Contact } from '$lib/db/models/types';

import { writable } from 'svelte/store';


const createContactsStore = async () =>{

	const store = writable<Contact>([]);


	const {set, update ,subscribe} = store
	
	return {
		subscribe,
		set,
		update,
	}
}
export const contacts = await createContactsStore()

