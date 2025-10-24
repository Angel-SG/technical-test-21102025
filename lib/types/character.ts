export interface Character {
	id: string;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "unknown";
	origin: {
		name: string;
		type: string;
		dimension: string;
	};
	location: {
		name: string;
		type: string;
		dimension: string;
	};
	image: string;
	episode: Episode[];
	created: string;
}

export interface Episode {
	id: string;
	name: string;
	episode: string;
	air_date: string;
}

export interface CharactersInfo {
	count: number;
	pages: number;
	next: number | null;
	prev: number | null;
}

export interface CharactersResponse {
	characters: {
		info: CharactersInfo;
		results: Character[];
	};
}

export interface CharacterResponse {
	character: Character;
}

export interface FilterCharacter {
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
}
