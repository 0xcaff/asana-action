import * as React from "react";
import { LinkMutation } from "./LinkMutation";
import { Redirect } from "react-router";
import { configurationPage } from "../paths";
import { CallOnMount } from "./CallOnWillMount";
import { FullPageError, FullPageLoading } from "./styledComponents";

interface Props {
  code: string;
  linkToken: string | null;
  setAuthToken: (newAuthToken: string) => void;
}

export const AsanaOauthRedirectPage = (props: Props) => (
  <LinkMutation variables={{ code: props.code }}>
    {(link, result) => {
      if (result.data) {
        props.setAuthToken(result.data.linkAsana.token);

        return (
          <Redirect
            to={{
              pathname: configurationPage,
              state: { linkToken: props.linkToken }
            }}
          />
        );
      } else if (result.error) {
        return (
          <FullPageError>
            Error from backend: {result.error.message}
          </FullPageError>
        );
      } else if (result.loading) {
        return <FullPageLoading />;
      } else if (!result.data && !result.loading) {
        return <CallOnMount fn={link} />;
      }

      return null;
    }}
  </LinkMutation>
);
