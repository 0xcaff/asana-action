import * as React from "react";

import { AsanaQuery } from "./AsanaQuery";
import { getAuthorizationEndpoint } from "./asana";
import { ids } from "../clients";
import { Redirect } from "react-router";
import { landingPage } from "./paths";

interface Props {
  authToken?: string;
}

export const ConfigPage = (props: Props) => {
  if (!props.authToken) {
    return <Redirect to={landingPage} />;
  }

  return (
    <AsanaQuery>
      {queryResult => {
        if (queryResult.error) {
          return <div>Error Occurred!</div>;
        }

        if (queryResult.loading || !queryResult.data) {
          return <div>Loading...</div>;
        }

        if (!queryResult.data.me.asana) {
          window.location.assign(
            getAuthorizationEndpoint({
              responseType: "code",
              state: "",
              ...ids.asana
            })
          );

          return null;
        }

        // TODO: Implement
        return JSON.stringify(queryResult.data);
      }}
    </AsanaQuery>
  );
};
