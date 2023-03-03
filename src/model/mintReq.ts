interface MintRequest {
    mintUrl: string,
    isCompleted: boolean,
    invoice: string,
    paymentHash: string
}

export type {MintRequest}