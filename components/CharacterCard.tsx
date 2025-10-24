import Link from "next/link";
import Image from "next/image";
import { Character } from "@/lib/types/character";

interface CharacterCardProps {
	character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Alive":
				return "bg-green-100 text-green-800 border-green-200";
			case "Dead":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<Link
			href={`/characters/${character.id}`}
			className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
		>
			<div className="relative">
				<Image
					src={character.image}
					alt={character.name}
					width={300}
					height={300}
					className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute top-3 right-3">
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(character.status)}`}
					>
						{character.status}
					</span>
				</div>
			</div>

			<div className="p-4">
				<h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
					{character.name}
				</h3>
				<p className="text-sm text-gray-600 mb-2">{character.species}</p>
				<div className="flex items-center justify-between">
					<span className="text-xs text-gray-500">ID: {character.id}</span>
					<div className="flex items-center text-blue-600 text-sm font-medium">
						View Details
						<svg
							className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Link>
	);
}
