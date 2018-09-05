import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LandingPage } from "./LandingPage";
import { ConfigPage } from "./ConfigPage";
import { AsanaOauthRedirectPage } from "./AsanaOauthRedirectPage";

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <LandingPage />} />
      <Route exact path="/configure" render={() => <ConfigPage />} />
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
  </BrowserRouter>
);
