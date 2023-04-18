import { readable } from 'svelte/store';

const version = readable<string>('0.1.10');

export { version };
