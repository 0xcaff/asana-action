import * as React from "react";
import { LinkMutation } from "./graphql/LinkMutation";
import { Redirect } from "react-router";
import { configurationPage } from "../paths";
import { CallOnMount } from "./CallOnWillMount";
import { FullPageError, FullPageLoading } from "./styledComponents";

interface Props {
  code: string;

  /**
   * Token which will be sent in the final response to Google Assistant
   */
  linkToken: string | null;

  /**
   * Called after delegate OAuth token is received
   */
  setAuthToken: (newAuthToken: string) => void;
}

/**
 * Sends authorization code to backend and collects delegate OAuth token. The
 * declarative pattern probably isn't the best for this.
 */
export const AsanaOauthRedirectPage = (props: Props) => (
  <LinkMutation variables={{ code: props.code }}>
    {(link, result) => {
      if (result.data) {
        props.setAuthToken(result.data.linkAsana.token);

        return (
          <Redirect
            to={{
              pathname: configurationPage,
              state: { linkState: props.linkToken }
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
