import { readable } from 'svelte/store';

const version = readable<string>('0.2.7');

export { version };
