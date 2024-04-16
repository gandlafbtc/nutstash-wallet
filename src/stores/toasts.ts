import { tweened, type Tweened } from 'svelte/motion';
import type { Toast } from '../model/toast';
import { writable } from 'svelte/store';

export const notifications = writable<{ toast: Toast; timer: Tweened<number> }[]>([]);

export function toast(level: string, message: string, messageTitle: string) {
	const timer = tweened(100);
	notifications.update((state) => [...state, { toast: { level, message, messageTitle }, timer }]);
	timer.set(0, { duration: 8000 });
	setTimeout(removeToast, 8000);
}

function removeToast() {
	notifications.update((state) => {
		state.shift();
		return [...state];
	});
}
