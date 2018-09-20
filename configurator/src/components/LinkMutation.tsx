import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationProps } from "react-apollo";

import { Omit } from "../utils";

// TODO: Implement on Backend
const mutation = gql`
  mutation LinkMutation($code: String!) {
    linkAsana(authorizationCode: $code) {
      token
    }
  }
`;

interface Variables {
  code: string;
}

interface Data {
  linkAsana: {
    token: string;
  };
}

export const LinkMutation = (
  props: Omit<MutationProps<Data, Variables>, "mutation">
) => <Mutation mutation={mutation} {...props} />;
