import { readable } from 'svelte/store';

const version = readable<string>('2.0.3');

export { version };
