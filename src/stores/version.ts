import { readable } from 'svelte/store';

const version = readable<string>('0.2.5');

export { version };
