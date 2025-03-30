import { readable } from 'svelte/store';

const version = readable<string>('2.1.1');

export { version };
