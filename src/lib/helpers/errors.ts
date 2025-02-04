export const ensureError = (err: unknown): Error => {
	if (err instanceof Error) {
		return err;
	}
	return new Error(`${err}`);
};

export const ensureContextError = (err: unknown): ContextError => {
	if (err instanceof ContextError) {
		return err;
	}
	return new ContextError(`${err}`);
};

export class ContextError extends Error {
	context?: unknown;
	cause?: Error;
	constructor(message: string, options?: { cause?: Error; context?: unknown }) {
		super(message, options);
		this.name = 'ContextError';
		this.context = this.context;
	}
}
