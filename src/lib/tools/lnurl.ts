export const lnurlCallback = async (address: string): Promise<string> => {
    const addressParts = address.split('@');
    const endpoint = `https://${addressParts[1]}/.well-known/lnurlp/${addressParts[0]}`;
    const { callback } = (await (await fetch(endpoint)).json()) as { callback: string };
    if (!callback) {
        throw new Error('No callback url found.');
    }
    return callback;
}

export const getInvoiceForLNURLAddress = async (amount: number, address: string): Promise<string> => {
    const callback = await lnurlCallback(address);
    const cb = `${callback + (callback.includes('?') ? "&" : "?")}amount=${amount * 1000}`;
    const { pr } = (await (await fetch(cb)).json()) as { pr: string };
    return pr;
}