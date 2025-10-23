import { Suspense } from "react";
import ClientList from "./ClientList";
import { Skeleton } from "@/components/UI";

// TODO: Consider implementing SSR/ISR for initial data
// - Fetch first page of characters on the server
// - Pass initialData to ClientList for hydration
// - Decide on caching strategy

export default async function CharactersPage() {
	return (
		<main className="space-y-4">
			<h1 className="text-4xl font-semibold">Characters</h1>
			<Suspense fallback={<Skeleton className="h-48" />}>
				<ClientList />
			</Suspense>
		</main>
	);
}
