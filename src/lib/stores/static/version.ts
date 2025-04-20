import { readable } from 'svelte/store';

const version = readable<string>('2.1.2');

export { version };
