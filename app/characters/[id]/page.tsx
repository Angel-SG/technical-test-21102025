import Link from "next/link";

// TODO: Implement character detail page
// Requirements:
// - Fetch character data by ID using GraphQL
// - Display basic info (name, status, species, image)
// - Show episodes where the character appears
// - Handle loading and error states
// - Make it accessible

interface Params {
	params: { id: string };
}

export default function CharacterPage({ params }: Params) {
	return (
		<main className="space-y-4">
			<Link href="/characters" className="underline">
				← Back to list
			</Link>
			<div>
				<p>TODO: Implement character detail for ID: {params.id}</p>
			</div>
		</main>
	);
}
