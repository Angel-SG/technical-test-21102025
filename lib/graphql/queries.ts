import { gql } from "@apollo/client";

// Super simple character query - no filters, no complications
export const GET_CHARACTERS = gql`
	query GetCharacters($page: Int) {
		characters(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				status
				species
				image
			}
		}
	}
`;

// Single character query
export const GET_CHARACTER_BY_ID = gql`
	query GetCharacterById($id: ID!) {
		character(id: $id) {
			id
			name
			status
			species
			type
			gender
			origin {
				name
			}
			location {
				name
			}
			image
			episode {
				id
				name
				episode
				air_date
			}
			created
		}
	}
`;
