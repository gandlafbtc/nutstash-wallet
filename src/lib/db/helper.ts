import { bytesToHex, randomBytes } from "@noble/hashes/utils"

export let randDBKey = () => {
    return bytesToHex(randomBytes(8))
}