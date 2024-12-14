import { readable } from 'svelte/store';

const version = readable<string>('2.0.2');

export { version };
