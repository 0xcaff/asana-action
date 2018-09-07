import * as React from "react";

import { Content, DarkHeading } from "./styledComponents";
import { GoogleSignIn } from "./GoogleSignIn";
import { Redirect } from "react-router";

import { configurationPage } from "../paths";
import { ids } from "../clients";

interface Props {
  isSignedIn: boolean;
  setToken: (newToken: string) => void;
}

export const GoogleSignInPage = (props: Props) =>
  props.isSignedIn ? (
    <Redirect to={configurationPage} />
  ) : (
    <Content>
      <DarkHeading>First, connect your google account.</DarkHeading>

      <GoogleSignIn
        clientId={ids.google.clientId}
        onSignInChanged={e => props.setToken(e.id_token)}
      />
    </Content>
  );
