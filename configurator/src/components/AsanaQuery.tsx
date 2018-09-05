import * as React from "react";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

import { Omit } from "../utils";

const query = gql`
  query AsanaQuery {
    me {
      id

      asana {
        workspaces {
          id
          name
        }

        chosenWorkspace {
          id
        }
      }
    }
  }
`;

export interface Workspace {
  id: string;
  name: string;
}

interface BareWorkspace {
  id: string;
}

interface Asana {
  workspaces: Workspace[];
  chosenWorkspace: BareWorkspace;
}

interface User {
  asana?: Asana;
}

interface Data {
  me: User;
}

export const AsanaQuery = (props: Omit<QueryProps<Data, {}>, "query">) => (
  <Query query={query} {...props} />
);
