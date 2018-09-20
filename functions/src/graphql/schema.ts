import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Workspace {
    id: String!
    name: String!
  }

  type User {
    id: String!

    # Asana workspaces associated with this user.
    workspaces: [Workspace!]!

    # The identifier of the workspace associated with the user.
    chosenWorkspaceId: String
  }

  type Query {
    # User associated with the session. Accessing this field without
    # authentication causes an error.
    me: User!
  }

  type AuthResponse {
    token: String!
  }

  type Mutation {
    linkAsana(authorizationCode: String!): AuthResponse!
    setDefaultWorkspace(id: String!): User!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
