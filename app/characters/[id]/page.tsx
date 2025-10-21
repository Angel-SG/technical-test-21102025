import { gql } from '@apollo/client';
import Link from 'next/link';
import { makeClient } from '@/lib/apollo-client';

// For simplicity, using client in server file. Candidate may refactor for SSR.
const client = makeClient();

const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
      episode { id name episode }
    }
  }
`;

interface Params { params: { id: string } }

export default async function CharacterPage({ params }: Params) {
  // TODO (Candidate): Consider cache and fetch policies suitable for SSR/ISR.
  const { data } = await client.query({ query: CHARACTER_QUERY, variables: { id: params.id } });
  const c = data?.character;

  if (!c) {
    return (
      <main className="space-y-4">
        <p>Character not found.</p>
        <Link href="/characters" className="underline">← Back to list</Link>
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <Link href="/characters" className="underline">← Back to list</Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={c.name} src={c.image} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-2xl font-semibold">{c.name}</h1>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">{c.status} • {c.species}</div>
          <div>
            <h2 className="text-lg font-medium mt-4 mb-2">Episodes</h2>
            <ul className="list-disc pl-6 space-y-1">
              {c.episode?.map((e: any) => (
                <li key={e.id}>{e.episode} — {e.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
