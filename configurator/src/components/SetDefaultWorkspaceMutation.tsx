import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationProps } from "react-apollo";

import { Omit } from "../utils";

const mutation = gql`
  mutation SetDefaultWorkspaceMutation($workspaceId: String!) {
    setDefaultWorkspace(workspaceId: $workspaceId) {
      id

      asana {
        chosenWorkspace {
          id
        }
      }
    }
  }
`;

interface Variables {
  workspaceId: string;
}

export const SetDefaultWorkspaceMutation = (
  props: Omit<MutationProps<{}, Variables>, "mutation">
) => <Mutation mutation={mutation} {...props} />;
