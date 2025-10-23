"use client";
import { useQuery, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CHARACTERS,  GET_CHARACTERS_FILTERED, GET_CHARACTER_BY_NAME } from '../api/graphql-proxy/route';
import Link from 'next/link';

interface Character {
	id: string;
	name: string;
	status: string;
}




export default function ClientList() {
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('');
	const [page, setPage] = useState(1);
	const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {variables: { page }, notifyOnNetworkStatusChange: true});
	const [getCharacterByName, { data :searchData }] = useLazyQuery(GET_CHARACTER_BY_NAME);
	const [getCharactersFiltered, {data: dataFiltered}] = useLazyQuery(GET_CHARACTERS_FILTERED)



	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No data</div>;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};
	
	const handleSearchButton = () => {
		try{
			getCharacterByName({variables: {  filter: { name: search } }})
		} catch (error) {
			console.error("error getting character by name", error);
		}
	};

	const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(event.target.value);
		if (event.target.value) {
			getCharactersFiltered({variables: { filter: { status: event.target.value } }})
		} else {
			setPage(1);
		}
	};

	const getActiveData = () => {
		if (search && searchData?.characters) return searchData.characters;
		if (status && dataFiltered?.characters) return dataFiltered.characters;
		return data.characters;
	};

	const handlePreviousPage = () => {
		const activeData = getActiveData();
		if (activeData?.info?.prev) {
			const previousPage = activeData.info.prev;
			setPage(previousPage);

			if (status) {
				getCharactersFiltered({variables: { page: previousPage, filter: { status } }});
			} else if (search) {
				getCharacterByName({variables: { filter: { name: search }, page: previousPage }});
			} else {
				fetchMore({ variables: { page: previousPage } });
			}
		}
	};

	const handleNextPage = () => {
		const activeData = getActiveData();
		if (activeData?.info?.next) {
			const nextPage = activeData.info.next;
			setPage(nextPage);

			if (status) {
				getCharactersFiltered({variables: { page: nextPage, filter: { status } }});
			} else if (search) {
				getCharacterByName({variables: { filter: { name: search }, page: nextPage }});
			} else {
				fetchMore({ variables: { page: nextPage } });
			}
		}
	};

	const charactersToShow = getActiveData().results;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-end gap-4">
				<div className="flex flex-col gap-2 w-full max-w-md">
					<label htmlFor="search" className="text-sm font-medium">
						Search by name
					</label>

					<div className="flex gap-3">
						<input
						type="text"
						id="search"
						placeholder="Filter by name"
						value={search}
						onChange={handleSearch}
						className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3c1d1]"
						/>
						<button
						onClick={handleSearchButton}
						disabled={!search.trim()}
						className="disabled:text-gray-400 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 rounded-lg transition-colors duration-300 shadow-sm"
						>
						Search
						</button>
					</div>
				</div>

				<div className="flex-shrink-0">
					<select
						value={status}
						onChange={handleFilter}
						className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3c1d1]"
					>
						<option value="">Filter by status</option>
						<option value="alive">Alive</option>
						<option value="dead">Dead</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{charactersToShow.map((character: Character) => (
					<Link key={character.id}  href={`/characters/${character.id}`} className="border border-gray-300 rounded-md p-4">
						<h2 className="text-lg font-bold">{character.name}</h2>
						<p className="text-sm text-gray-500">{character.status}</p>
					</Link>
				))}
			</div>
			<div className="flex justify-between">
				<button onClick={handlePreviousPage} disabled={!getActiveData()?.info?.prev} className='disabled:text-gray-400 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm'>Previous Page</button>
				<button onClick={handleNextPage} disabled={!getActiveData()?.info?.next} className='disabled:text-gray-400 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm'>Next Page</button>
			</div>
		</div>
			
	);
}
