"use client";

import { GET_CHARACTER_BY_ID } from "@/app/api/graphql-proxy/route";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";



interface Params {
	params: { id: string };
}
interface Episode {
	id: string;
	name: string;
}
export default function CharacterPage({ params }: Params) {
	const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {variables: { id:Number(params.id) }});
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No data</div>;

	const character = data.character;

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<Link href="/characters" className="underline">
				← Back to list
			</Link>
		{character ? (
			<div className="space-y-8">
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex flex-col md:flex-row gap-6">
						
						<div className="flex-1 space-y-4">
							<h1 className="text-4xl font-bold ">{character.name}</h1>
							<div className="space-y-2 text-gray-700">
								<p className="text-lg">
									<strong className="font-semibold">Status:</strong>
									<span className={`ml-2 px-3 py-1 rounded-full text-sm ${
										character.status === 'Alive' ? 'bg-green-100 text-green-800' :
										character.status === 'Dead' ? 'bg-red-100 text-red-800' :
										'bg-gray-100 text-gray-800'
									}`}>
										{character.status}
									</span>
								</p>
								<p className="text-lg">
									<strong className="font-semibold">Gender:</strong>
									<span className="ml-2">{character.gender}</span>
								</p>
								<p className="text-lg">
									<strong className="font-semibold ">Species:</strong>
									<span className="ml-2">{character.species}</span>
								</p>
								<p className="text-lg">
									<strong className="font-semibold ">Origin:</strong>
									<span className="ml-2">{character.origin.name}</span>
								</p>
								<p className="text-lg">
									<strong className="font-semibold ">Location:</strong>
									<span className="ml-2">{character.location.name}</span>
								</p>
							</div>
						</div>

						<div className="flex-shrink-0">
							<Image
								src={character.image}
								alt={"image of " + character.name}
								className="rounded-lg shadow-md"
								width={288}
								height={288}
							/>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-bold mb-4">
						Episodes where {character.name} appears:
					</h2>
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{character.episode.map((episode: Episode) => (
							<li
								key={episode.id}
								className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
							>
								{episode.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		) : (
			<div className="text-center text-gray-600">No character found</div>
		)}

		</main>
	);
}
