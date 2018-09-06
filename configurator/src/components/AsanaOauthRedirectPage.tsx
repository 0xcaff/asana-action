import * as React from "react";
import { LinkMutation } from "./LinkMutation";
import { Redirect } from "react-router";
import { configurationPage } from "../paths";
import { CallOnMount } from "./CallOnWillMount";

interface Props {
  code: string | null;
}

export const AsanaOauthRedirectPage = (props: Props) => {
  if (!props.code) {
    return <div>Error!</div>;
  }

  return (
    <LinkMutation variables={{ code: props.code }}>
      {(link, result) => {
        if (result.data) {
          return <Redirect to={configurationPage} />;
        } else if (result.error) {
          return <div>Error</div>;
        } else if (result.loading) {
          return <div>Loading</div>;
        } else if (!result.data && !result.loading) {
          return <CallOnMount fn={link} />;
        }

        return null;
      }}
    </LinkMutation>
  );
};
