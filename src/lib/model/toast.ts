interface Toast {
	level?: 'success' | 'info' | 'warning' | 'error' | 'secondary';
	message: string;
	messageTitle?: string;
}

export type { Toast };
