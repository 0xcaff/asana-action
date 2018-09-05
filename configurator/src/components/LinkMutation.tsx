import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationProps } from "react-apollo";

import { Omit } from "../utils";

const mutation = gql`
  mutation LinkMutation($code: String!) {
    linkAsana(authorizationCode: $code) {
      asana {
        chosenWorkspace {
          id
        }
      }
    }
  }
`;

interface Variables {
  code: string;
}

export const LinkMutation = (
  props: Omit<MutationProps<{}, Variables>, "mutation">
) => <Mutation mutation={mutation} {...props} />;
