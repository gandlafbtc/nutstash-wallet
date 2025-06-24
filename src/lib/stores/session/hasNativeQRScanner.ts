import { readable } from "svelte/store";

const checkBarcodeDetector = () => {
    try {
        if (!('BarcodeDetector' in window)) {
            return false; 
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const hasNativeQRScanner = readable(checkBarcodeDetector()) 