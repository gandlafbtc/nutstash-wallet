import type { Proof } from '@cashu/cashu-ts';
import { json } from '@sveltejs/kit';
import fs from "fs/promises";

const tokensFileName = "./data/tokens.json"

export async function GET() {
	try {
		const file = await fs.readFile(tokensFileName)
		const tokens = file.toString()

		return new Response(tokens, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error)
		return new Response(null, { status: 500 })
	}
}


export async function POST({ request }) {
	const data: Proof[] = await request.json()

	if (!data || !data.length) {
		return json({}, { status: 200, statusText: 'No tokens to sync' });
	}

	try {
		await fs.writeFile("./tokens.json", await JSON.stringify(data))
		return json({}, { status: 201, statusText: 'Tokens synced to server' });
	} catch (error) {
		console.log(error)
		return json({}, { status: 500, statusText: 'could not save token backup file on server' });
	}
}