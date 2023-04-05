import { readable } from 'svelte/store';

const version = readable<string>('0.1.9');

export { version };
