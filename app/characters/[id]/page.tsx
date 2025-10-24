"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/UI";

interface Params {
	params: { id: string };
}

export default function CharacterPage({ params }: Params) {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCharacter = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch("https://rickandmortyapi.com/graphql", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						query: `
							query GetCharacterById($id: ID!) {
								character(id: $id) {
									id name status species type gender
									origin { name }
									location { name }
									image
									episode { id name episode air_date }
									created
								}
							}
						`,
						variables: { id: params.id },
					}),
				});

				const result = await response.json();
				if (result.errors) {
					setError(result.errors[0].message);
				} else {
					setData(result.data);
				}
			} catch (err) {
				setError("Failed to fetch character");
			} finally {
				setLoading(false);
			}
		};

		fetchCharacter();
	}, [params.id]);

	if (loading) {
		return (
			<div className="max-w-6xl mx-auto px-4 py-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
					<div className="bg-white rounded-lg shadow-lg p-6">
						<div className="flex flex-col md:flex-row gap-6">
							<div className="flex-1 space-y-4">
								<div className="h-8 bg-gray-200 rounded w-3/4"></div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
									<div className="h-4 bg-gray-200 rounded w-1/3"></div>
									<div className="h-4 bg-gray-200 rounded w-2/3"></div>
								</div>
							</div>
							<div className="w-72 h-72 bg-gray-200 rounded-lg"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-6xl mx-auto px-4 py-8">
				<Link
					href="/characters"
					className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back to Characters
				</Link>

				<div className="text-center py-12">
					<div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
						<div className="text-red-600 text-lg font-semibold mb-2">
							Character Not Found
						</div>
						<p className="text-red-700 mb-4">{error}</p>
						<Button
							onClick={() => window.location.reload()}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							Try Again
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const character = data?.character;

	if (!character) {
		return (
			<div className="max-w-6xl mx-auto px-4 py-8">
				<Link
					href="/characters"
					className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
				>
					<svg
						className="w-4 h-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back to Characters
				</Link>

				<div className="text-center py-12">
					<div className="text-gray-500 text-lg">Character not found</div>
				</div>
			</div>
		);
	}

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
		<div className="max-w-6xl mx-auto px-4 py-8">
			<Link
				href="/characters"
				className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
			>
				<svg
					className="w-4 h-4 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back to Characters
			</Link>

			<div className="space-y-8">
				{/* Character Info Card */}
				<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="flex flex-col lg:flex-row">
						<div className="lg:w-1/3">
							<div className="relative">
								<Image
									src={character.image}
									alt={character.name}
									width={400}
									height={400}
									className="w-full h-96 lg:h-full object-cover"
								/>
								<div className="absolute top-4 right-4">
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(character.status)}`}
									>
										{character.status}
									</span>
								</div>
							</div>
						</div>

						<div className="lg:w-2/3 p-8">
							<h1 className="text-4xl font-bold text-gray-900 mb-6">
								{character.name}
							</h1>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Species
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{character.species}
										</p>
									</div>

									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Gender
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{character.gender}
										</p>
									</div>

									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Type
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{character.type || "Unknown"}
										</p>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Origin
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{character.origin.name}
										</p>
										{character.origin.dimension && (
											<p className="text-sm text-gray-600 mt-1">
												Dimension: {character.origin.dimension}
											</p>
										)}
									</div>

									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Location
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{character.location.name}
										</p>
										{character.location.dimension && (
											<p className="text-sm text-gray-600 mt-1">
												Dimension: {character.location.dimension}
											</p>
										)}
									</div>

									<div>
										<label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
											Created
										</label>
										<p className="text-lg text-gray-900 mt-1">
											{new Date(character.created).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Episodes Card */}
				<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Episodes ({character.episode.length})
					</h2>

					{character.episode.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{character.episode.map((episode: any) => (
								<div
									key={episode.id}
									className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
								>
									<div className="flex items-start justify-between mb-2">
										<h3 className="font-semibold text-gray-900 text-sm leading-tight">
											{episode.name}
										</h3>
										<span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full ml-2 flex-shrink-0">
											{episode.episode}
										</span>
									</div>
									<p className="text-xs text-gray-600">
										{new Date(episode.air_date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</p>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>No episodes found for this character.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
