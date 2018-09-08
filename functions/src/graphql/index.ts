import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { mutations } from "./mutations";
import { queries } from "./queries";
import { context } from "./context";
import { isDevelopment } from "../env";

export const server = new ApolloServer({
  typeDefs,
  resolvers: { Mutation: mutations, ...queries },
  context,
  playground: isDevelopment,
  debug: isDevelopment,
});
