// Optional proxy (stub). Candidate can finish if they choose to.
import { NextRequest } from 'next/server';
import { gql } from '@apollo/client';

export async function POST(req: NextRequest) {
  // Forward the GraphQL body to the public API (CORS/header playground)
  const body = await req.text();
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });
  const data = await res.text();
  return new Response(data, { headers: { 'content-type': 'application/json' } });
}



export const GET_CHARACTERS = gql`
  query($page: Int) {
  characters(page: $page) {
    info {
      next
      prev
      pages
    }
    results {
      id
      name
      status
    }
  }
}`;

export const GET_CHARACTERS_FILTERED = gql`
  query($page: Int, $filter: FilterCharacter){
    characters(page: $page, filter: $filter){
      info {
        next
        prev
        pages
      }
      results {
        id
        name
        status
      }
    }
  }
`;


export const GET_CHARACTER_BY_NAME = gql`
  query($filter: FilterCharacter, $page: Int){
    characters(filter: $filter, page: $page){
      info {
        next
        prev
        pages
      }
      results{
        id
        name
        status
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query($id: ID!){
    character(id: $id){
      id
      name
      status
      species
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
      }
    }
  }
`;


