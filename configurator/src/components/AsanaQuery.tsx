import * as React from "react";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

import { Omit } from "../utils";

const query = gql`
  query AsanaQuery {
    me {
      asana {
        workspaces {
          id
          name
        }

        chosenWorkspace {
          id
          name
        }
      }
    }
  }
`;

interface Workspace {
  id: string;
  name: string;
}

interface Asana {
  workspaces: Workspace[];
  chosenWorkspace: Workspace;
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
