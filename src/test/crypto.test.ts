import { decrypt, encrypt, kdf } from '$lib/actions/encryption'
import { expect, test } from 'vitest'

test('encrypt decrypt', async () => {
    const password = '<PASSWORD>'
    const plaintextObj: {hello: string} = {hello: 'world'}

    const key = await kdf(password)

    const {cypher , iv} = await encrypt(plaintextObj, key)
    const decrypted = await decrypt(cypher, key, iv) as {hello: string}

    expect(decrypted.hello).toBe(plaintextObj.hello)
})

test(
    'sort newest first', async () => {
        const arr = [
            {
                id: 1,
                name: 'a',
            },
            {
                id: 2,
                name: 'b',
            },
            {
                id: 3,
                name: 'c',
            },
        ]

        const sorted = arr.sort((a, b) => b.id - a.id)

        expect(sorted).toEqual([
            {
                id: 3,
                name: 'c',
            },
            {
                id: 2,
                name: 'b',
            },
            {
                id: 1,
                name: 'a',
            },
        ])
    },
)