import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const RICK_AND_MORTY_GRAPHQL = "https://rickandmortyapi.com/graphql";

/**
 * TODO: Configure Apollo Client for client-side usage
 * - Set up proper cache policies for pagination/search
 * - Consider error handling and retry logic
 * - Optimize for the Rick & Morty API structure
 */
export default function makeClient() {
	return new ApolloClient({
		link: new HttpLink({ uri: RICK_AND_MORTY_GRAPHQL }),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						characters: {
							keyArgs: false,
							merge(existing = { results: [] }, incoming) {
								return{
									...existing,
									results: [...(existing.results || []), ...incoming.results],
								};
							}
						},
					},
				},
			},
		}),
	});
}
