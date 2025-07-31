import { readable } from 'svelte/store';

const version = readable<string>('2.2.0');

export { version };
