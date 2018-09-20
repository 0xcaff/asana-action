import * as React from "react";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

import { Omit } from "../utils";

const query = gql`
  query AsanaQuery {
    me {
      id

      workspaces {
        id
        name
      }

      chosenWorkspaceId
    }
  }
`;

export interface Workspace {
  id: string;
  name: string;
}

interface User {
  workspaces: Workspace[];
  chosenWorkspaceId: string | null;
}

interface Data {
  me: User;
}

export const AsanaQuery = (props: Omit<QueryProps<Data, {}>, "query">) => (
  <Query query={query} {...props} />
);
