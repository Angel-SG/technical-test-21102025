import { Suspense } from 'react';
import ClientList from './ClientList';
import { Skeleton } from '@/components/UI';

/**
 * TODO (Candidate):
 * - Perform the initial data fetch on the server (SSR or ISR) for the first page
 *   and pass it to <ClientList initialData={...} />.
 * - You decide the exact shape of initialData and pagination state.
 */
export default async function CharactersPage() {
  // const initialData = await fetchFirstPage(); // SSR/ISR – Candidate to implement

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Characters</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Search by name, filter by status and paginate.</p>
      <Suspense fallback={<Skeleton className="h-48" />}> 
        <ClientList /* initialData={initialData} */ />
      </Suspense>
    </main>
  );
}
