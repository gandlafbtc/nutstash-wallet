
import { writable } from 'svelte/store';

import NDK from '@nostr-dev-kit/ndk';
import { SimplePool } from 'nostr-tools';


const nostrPool = writable<SimplePool>(new SimplePool());



export {
	nostrPool
};
