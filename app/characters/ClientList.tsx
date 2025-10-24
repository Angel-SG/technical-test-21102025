"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import CharacterCard from "@/components/CharacterCard";
import CharacterCardSkeleton from "@/components/CharacterCardSkeleton";
import { Button, Input, Select } from "@/components/UI";

export default function ClientList() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCharacters = async () => {
			setLoading(true);
			setError(null);

			// Build filter object
			const filter: any = {};
			if (debouncedSearchTerm) filter.name = debouncedSearchTerm;
			if (statusFilter) filter.status = statusFilter;

			try {
				const response = await fetch("https://rickandmortyapi.com/graphql", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						query: `
							query GetCharacters($page: Int, $name: String, $status: String) {
								characters(page: $page, filter: { name: $name, status: $status }) {
									info { count pages next prev }
									results { id name status species image }
								}
							}
						`,
						variables: {
							page: currentPage,
							name: debouncedSearchTerm || undefined,
							status: statusFilter || undefined,
						},
					}),
				});

				const result = await response.json();
				if (result.errors) {
					setError(result.errors[0].message);
				} else {
					setData(result.data);
				}
			} catch (err) {
				setError("Failed to fetch characters");
			} finally {
				setLoading(false);
			}
		};

		fetchCharacters();
	}, [currentPage, debouncedSearchTerm, statusFilter]);

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
		// Scroll to top when changing pages
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const characters = data?.characters?.results || [];
	const info = data?.characters?.info;

	if (error) {
		return (
			<div className="text-center py-12">
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
					<div className="text-red-600 text-lg font-semibold mb-2">
						Oops! Something went wrong
					</div>
					<p className="text-red-700 mb-4">{error}</p>
					<Button
						onClick={() => setCurrentPage(1)}
						className="bg-red-600 hover:bg-red-700 text-white"
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Search and Filter Controls */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="md:col-span-2">
						<label
							htmlFor="search"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Search by name
						</label>
						<Input
							id="search"
							type="text"
							placeholder="Search characters..."
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								setCurrentPage(1);
							}}
							className="w-full"
						/>
					</div>
					<div>
						<label
							htmlFor="status"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Filter by status
						</label>
						<Select
							id="status"
							value={statusFilter}
							onChange={(e) => {
								setStatusFilter(e.target.value);
								setCurrentPage(1);
							}}
							className="w-full"
						>
							<option value="">All Status</option>
							<option value="Alive">Alive</option>
							<option value="Dead">Dead</option>
							<option value="unknown">Unknown</option>
						</Select>
					</div>
				</div>
			</div>

			{/* Results Header */}
			{info && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-600">
						Showing {characters.length} of {info.count} characters
						{info.pages > 1 && ` • Page ${currentPage} of ${info.pages}`}
					</div>
				</div>
			)}

			{/* Characters Grid */}
			{loading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<CharacterCardSkeleton key={i} />
					))}
				</div>
			) : characters.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{characters.map((character: any) => (
						<CharacterCard key={character.id} character={character} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg mb-4">No characters found</div>
				</div>
			)}

			{/* Pagination */}
			{info && info.pages > 1 && (
				<div className="flex items-center justify-center space-x-2">
					<Button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={!info.prev}
						variant="outline"
						className="px-4 py-2"
					>
						Previous
					</Button>

					<div className="flex items-center space-x-1">
						{Array.from({ length: Math.min(5, info.pages) }, (_, i) => {
							const pageNum = Math.max(1, currentPage - 2) + i;
							if (pageNum > info.pages) return null;

							return (
								<Button
									key={pageNum}
									onClick={() => handlePageChange(pageNum)}
									variant={pageNum === currentPage ? "default" : "outline"}
									className="px-3 py-2 min-w-[40px]"
								>
									{pageNum}
								</Button>
							);
						})}
					</div>

					<Button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={!info.next}
						variant="outline"
						className="px-4 py-2"
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
}
