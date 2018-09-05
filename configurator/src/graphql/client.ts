import ApolloClient from "apollo-client/ApolloClient";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AuthLink } from "./authLink";

const httpLink = createHttpLink({ uri: "/graphql" });
export const authLink = new AuthLink();

const cache = new InMemoryCache();
const link = authLink.concat(httpLink);

export const client = new ApolloClient({ link, cache });
