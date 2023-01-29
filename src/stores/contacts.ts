import { browser } from '$app/environment';
import type { Contact } from 'src/model/contact';

import { writable } from 'svelte/store';

const initialValueSting: string = browser ? window.localStorage.getItem('contacts') ?? '[]': '[]'

const initialValue : Array<Contact> = JSON.parse(initialValueSting)

const contacts  = writable<Array<Contact>>(initialValue);

contacts.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('contacts', JSON.stringify(value));
  }
});

export {contacts};