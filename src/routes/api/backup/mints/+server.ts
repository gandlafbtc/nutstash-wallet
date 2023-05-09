import { json } from '@sveltejs/kit';
import fs from "fs/promises";
import type { Mint } from '../../../../model/mint.js';

const mintsFileName = "/app/data/mints.json"

export async function GET() {
	try {
	const file  = await fs.readFile(mintsFileName)
	const mints = file.toString()

	return new Response(mints, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	} catch (error) {
		console.error(error)
		return new Response(null,{status: 500})
	}
	
}

export async function POST({ request }) {
	let data: Mint[] = await request.json()
	
	if (!data || !data.length) {
		return json({}, { status: 200, statusText: 'no mints to sync' });
	}
	data = data.filter(m => m.isAdded)

	if (!data || !data.length) {
		return json({}, { status: 200, statusText: 'no added mints to sync' });
	}

	try {
		await fs.writeFile(mintsFileName, await JSON.stringify(data))
		return json({}, { status: 201, statusText: 'Mints synced to server' });
	} catch (error) {
		console.log(error)
		return json({}, { status: 500, statusText: 'could not save mint backup file on server' });
	}
}