
import { readable } from 'svelte/store';

const version  = readable<string>('0.1.3');

export {version};