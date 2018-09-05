import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LandingPage } from "./LandingPage";
import { ConfigPage } from "./ConfigPage";
import { AsanaOauthRedirectPage } from "./AsanaOauthRedirectPage";
import { StateContainer } from "./StateContainer";
import { ApolloProvider } from "react-apollo";

import { authLink, client } from "../graphql/client";
import { configurationPage, landingPage } from "./paths";

export const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <StateContainer onSetAuthToken={token => authLink.setToken(token)}>
        {state => (
          <Switch>
            <Route
              exact
              path={landingPage}
              render={() => (
                <LandingPage
                  token={state.authToken}
                  setAuthenticationToken={state.setAuthToken}
                />
              )}
            />

            <Route
              exact
              path={configurationPage}
              render={() => <ConfigPage authToken={state.authToken} />}
            />

            <Route
              exact
              path="/asana/oauth"
              render={renderProps => {
                const params = new URLSearchParams(renderProps.location.search);
                const code = params.get("code");
                const state = params.get("state");

                return <AsanaOauthRedirectPage code={code} state={state} />;
              }}
            />
          </Switch>
        )}
      </StateContainer>
    </ApolloProvider>
  </BrowserRouter>
);
