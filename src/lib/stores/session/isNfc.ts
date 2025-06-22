import { readable } from "svelte/store";

const checkNfcSupport = () => {
    try {
        if (!('NDEFReader' in window)) {
            return false; 
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const isNfcSupported = readable(checkNfcSupport()) 