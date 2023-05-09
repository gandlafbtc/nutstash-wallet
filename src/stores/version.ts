import { readable } from 'svelte/store';

const version = readable<string>('0.1.11');

export { version };
