'use client';

import { useMemo, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeClient } from '@/lib/apollo-client';
import { Button, Input, Select, Skeleton } from '@/components/UI';
import Link from 'next/link';

// Apollo Client (client-side) — simple instance for CSR usage.
const client = makeClient();

// TODO (Candidate): extend fields as needed (image, etc.)
const CHARACTERS_QUERY = gql`
  query Characters($page: Int, $name: String, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info { count pages next prev }
      results { id name status species image }
    }
  }
`;

export default function ClientList(/* { initialData }: { initialData?: unknown } */) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string>('');

  const variables = useMemo(() => ({ page, name: name || undefined, status: status || undefined }), [page, name, status]);

  const { data, loading, error, refetch } = useQuery(CHARACTERS_QUERY, { variables, client, notifyOnNetworkStatusChange: true });

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <label className="text-sm" htmlFor="search">Search</label>
        <Input id="search" placeholder="e.g. Rick" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="text-sm" htmlFor="status">Status</label>
        <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Any</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </Select>

        <Button onClick={() => { setPage(1); refetch(); }}>Apply</Button>
      </div>

      {loading && <Skeleton className="h-48" />}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try adjusting filters or reloading.</div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.characters?.results?.map((c: any) => (
          <li key={c.id} className="">
            <Link href={`/characters/${c.id}`} className="block">
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt={c.name} src={c.image} className="w-full h-48 object-cover" />
                )}
                <div className="p-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">{c.status} • {c.species}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <Button onClick={() => setPage((p) => Math.max(1, (data?.characters?.info?.prev ?? p - 1) || p - 1))} disabled={!data?.characters?.info?.prev}>Prev</Button>
        <span className="text-sm">Page {page} / {data?.characters?.info?.pages ?? '—'}</span>
        <Button onClick={() => setPage((p) => (data?.characters?.info?.next ?? p + 1))} disabled={!data?.characters?.info?.next}>Next</Button>
      </div>
    </section>
  );
}
