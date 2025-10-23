// Optional proxy (stub). Candidate can finish if they choose to.
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // Forward the GraphQL body to the public API (CORS/header playground)
  const body = await req.text();
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });
  const data = await res.text();
  return new Response(data, { headers: { 'content-type': 'application/json' } });
}
