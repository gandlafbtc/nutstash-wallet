import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET() {

  const res: Response = json({
    names: {
      "_": "ca1d8486abd03d6e91aa042cb856a7da0da95e7b68180b22337aea2cd2ed0469"
    }
  });

  res.headers.append('Access-Control-Allow-Origin', "*");

  return res
}