import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LandingPage } from "./LandingPage";
import { ConfigPage } from "./ConfigPage";
import { AsanaOauthRedirectPage } from "./AsanaOauthRedirectPage";
import { ApolloProvider } from "react-apollo";

import { authLink, client } from "../graphql/client";
import { configurationPage, landingPage } from "../paths";
import { FullPageError } from "./styledComponents";
import { getAuthorizationEndpoint } from "../asana";
import { ids } from "../clients";

const allowedClientId = "1a295505-aa10-444d-8707-62fd01188836";

export const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path={landingPage} render={() => <LandingPage />} />

        <Route
          exact
          path="/assistant/link"
          render={renderProps => {
            const params = new URLSearchParams(renderProps.location.search);
            if (params.get("client_id") !== allowedClientId) {
              return <FullPageError>Invalid Assistant Client ID</FullPageError>;
            }

            const linkingState = params.get("state");
            if (!linkingState) {
              return (
                <FullPageError>Missing Assistant Linking State</FullPageError>
              );
            }

            return window.location.assign(
              getAuthorizationEndpoint({
                state: linkingState,
                responseType: "code",
                ...ids.asana
              })
            );
          }}
        />

        <Route
          exact
          path="/asana/oauth"
          render={renderProps => {
            const params = new URLSearchParams(renderProps.location.search);
            const code = params.get("code");
            if (!code) {
              return (
                <FullPageError>No Asana Authentication Code</FullPageError>
              );
            }

            const linkToken = params.get("state");
            return (
              <AsanaOauthRedirectPage
                code={code}
                linkToken={linkToken}
                setAuthToken={authToken => authLink.setToken(authToken)}
              />
            );
          }}
        />

        <Route
          exact
          path={configurationPage}
          render={renderProps => (
            <ConfigPage linkState={renderProps.location.state.linkState} />
          )}
        />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);
