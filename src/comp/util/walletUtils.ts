import type { Mint } from "src/model/mint";
import type { Token } from "src/model/token";

/**
 * returns a subset of tokens, so that not all tokens are sent to mint for smaller amounts.
 * @param amount 
 * @param tokens 
 * @returns 
 */
const getTokensToSend = (amount: number, tokens: Array<Token>) => {
    let tokenAmount = 0;
    const tokenSubset: Array<Token> = tokens.filter((token) => {
        if (tokenAmount < amount) {
            tokenAmount += token.amount;
            return true;
        }
    });
    return tokenSubset
}

/**
 * returns a subset of all tokens that belong to the specified mint
 * @param mint 
 * @param tokens 
 * @returns 
 */
const getTokensForMint = (mint: Mint, tokens: Array<Token>) => {
    const tokenSubset = tokens.filter((token) => {
        if (mint?.keysets.includes(token.id)) {
            return true;
        } else {
            return false;
        }
    });
    return tokenSubset
}

/**
 * removes a set of tokens from another set of tokens, and returns the remaining.
 * @param tokens 
 * @param tokensToRemove 
 * @returns 
 */
const getTokenSubset = (tokens: Array<Token>, tokensToRemove: Array<Token>) => {
    return tokens.filter((token) => !tokensToRemove.includes(token));
}

const getAmountForTokenSet = (tokens: Array<Token>): number => {
    return tokens.reduce((acc, t) => { return acc + t.amount }, 0)
}

const getKeysetsOfTokens = (tokens: Array<Token>) => {
    return removeDuplicatesFromArray(tokens.map(t => { return t.id }))
}


const removeDuplicatesFromArray = <Type>(array: Array<Type>) => {
    return array.reduce((acc: Array<Type>, curr: Type) => {
        if (acc.includes(curr)) { return acc }
        else { return [...acc, curr] }
    }, [])
}

export { getTokensToSend, getTokensForMint, getTokenSubset, getAmountForTokenSet, getKeysetsOfTokens, removeDuplicatesFromArray }