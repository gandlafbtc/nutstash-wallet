import { readable } from 'svelte/store';

const version = readable<string>('0.1.8');

export { version };
