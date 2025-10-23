"use client";

import { ApolloProvider } from "@apollo/client";
import makeClient from "../lib/apollo-client";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
}
