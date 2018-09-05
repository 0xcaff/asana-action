import * as React from "react";

import { GoogleSignIn } from "./GoogleSignIn";
import { ids } from "../clients";
import { Redirect } from "react-router";
import { configurationPage } from "./paths";

interface Props {
  token?: string;
  setAuthenticationToken: (authToken: string) => void;
}

export const LandingPage = (props: Props) =>
  props.token ? (
    <Redirect to={configurationPage} />
  ) : (
    <GoogleSignIn
      clientId={ids.google.clientId}
      onSignInChanged={token => {
        props.setAuthenticationToken(token.id_token);
      }}
    />
  );
