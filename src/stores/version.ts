import { readable } from 'svelte/store';

const version = readable<string>('0.1.4');

export { version };
