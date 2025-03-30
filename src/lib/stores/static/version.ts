import { readable } from 'svelte/store';

const version = readable<string>('2.0.5');

export { version };
