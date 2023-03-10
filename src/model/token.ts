interface Token {
	id: string;
	amount: number;
	secret: string;
	C: string;

	encodeProofToBase64(): string;
}

export type { Token };
