import { readable } from 'svelte/store';

const version = readable<string>('2.0.0.1');

export { version };
