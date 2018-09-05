import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Workspace {
    id: String!
    name: String!
  }

  type AsanaInformation {
    workspaces: [Workspace!]!
    chosenWorkspace: Workspace
  }

  type User {
    id: String!
    asana: AsanaInformation
  }

  type Query {
    # User associated with the session. Accessing this field without
    # authentication causes an error.
    me: User!
  }

  type Mutation {
    linkAsana(authorizationCode: String!): User!
    setDefaultWorkspace(id: String!): User!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
