import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LandingPage } from "./LandingPage";
import { ConfigPage } from "./ConfigPage";
import { AsanaOauthRedirectPage } from "./AsanaOauthRedirectPage";
import { GoogleSignInPage } from "./GoogleSignInPage";
import { StateContainer } from "./StateContainer";
import { ApolloProvider } from "react-apollo";

import { authLink, client } from "../graphql/client";
import { configurationPage, landingPage, googleSignInPage } from "../paths";

export const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <StateContainer onSetAuthToken={token => authLink.setToken(token)}>
        {state => (
          <Switch>
            <Route exact path={landingPage} render={() => <LandingPage />} />

            <Route
              exact
              path={googleSignInPage}
              render={() => (
                <GoogleSignInPage
                  isSignedIn={!!state.authToken}
                  setToken={state.setAuthToken}
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

                const token = params.get("state");
                if (token == null) {
                  return <div>Error</div>;
                }
                state.setAuthToken(token);

                return <AsanaOauthRedirectPage code={code} />;
              }}
            />
          </Switch>
        )}
      </StateContainer>
    </ApolloProvider>
  </BrowserRouter>
);
