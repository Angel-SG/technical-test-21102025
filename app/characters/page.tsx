import { Suspense } from "react";
import ClientList from "./ClientList";
import { Skeleton } from "@/components/UI";

export default function CharactersPage() {
	return (
		<main className="space-y-6">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Rick & Morty Characters
				</h1>
				<p className="text-gray-600">
					Explore the multiverse of characters from the hit animated series
				</p>
			</div>
			<Suspense
				fallback={
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<Skeleton key={i} className="h-80" />
						))}
					</div>
				}
			>
				<ClientList />
			</Suspense>
		</main>
	);
}
