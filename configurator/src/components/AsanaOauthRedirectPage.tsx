import * as React from "react";
import { LinkMutation } from "./LinkMutation";
import { Redirect } from "react-router";
import { configurationPage } from "../paths";
import { CallOnMount } from "./CallOnWillMount";
import { FullPageError, FullPageLoading } from "./styledComponents";

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
          return <FullPageError />;
        } else if (result.loading) {
          return <FullPageLoading />;
        } else if (!result.data && !result.loading) {
          return <CallOnMount fn={link} />;
        }

        return null;
      }}
    </LinkMutation>
  );
};
