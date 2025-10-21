'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const RICK_AND_MORTY_GRAPHQL = 'https://rickandmortyapi.com/graphql';

/**
 * TODO (Candidate):
 * - Consider SSR vs CSR usage. You may create a separate server-side client if needed
 *   (e.g., using @apollo/experimental-nextjs-app-support or fetch link).
 * - Configure link and cache policies that fit pagination/search.
 */
export function makeClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: RICK_AND_MORTY_GRAPHQL, fetch }),
    cache: new InMemoryCache(),
    // Consider defaultOptions if you want specific fetchPolicy behavior
  });
}
