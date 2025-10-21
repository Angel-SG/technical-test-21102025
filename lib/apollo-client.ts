import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const RICK_AND_MORTY_GRAPHQL = "https://rickandmortyapi.com/graphql";

/**
 * TODO: Configure Apollo Client for both server and client usage
 * - Consider SSR vs CSR usage
 * - You may need separate server-side and client-side clients
 * - Configure cache policies for pagination/search
 * - Consider using @apollo/experimental-nextjs-app-support for better SSR
 */
export function makeClient() {
	return new ApolloClient({
		link: new HttpLink({ uri: RICK_AND_MORTY_GRAPHQL, fetch }),
		cache: new InMemoryCache(),
	});
}
