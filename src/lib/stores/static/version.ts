import { readable } from 'svelte/store';

const version = readable<string>('2.0.6');

export { version };
