import * as React from "react";

import { GoogleSignIn } from "./GoogleSignIn";
import { AuthResponse } from "./GAPI";
import { ids } from "./clients";
import { AsanaSignIn } from "./AsanaSignIn";

enum Step {
  GOOGLE_SIGN_IN,
  ASANA_SIGN_IN
}

interface State {
  step: Step;
}

class App extends React.Component<{}, State> {
  public state = { step: Step.GOOGLE_SIGN_IN };

  private onGoogleSignedIn = (response: AuthResponse) => {
    console.log(response);
    this.setState({ step: Step.ASANA_SIGN_IN });
  };

  public render() {
    switch (this.state.step) {
      case Step.GOOGLE_SIGN_IN:
        return (
          <GoogleSignIn
            clientId={ids.google.clientId}
            onSignInChanged={this.onGoogleSignedIn}
          />
        );

      case Step.ASANA_SIGN_IN:
        return (
          <AsanaSignIn
            options={{ ...ids.asana, responseType: "code", state: "" }}
          >
            Sign In to Asana!
          </AsanaSignIn>
        );
    }
  }
}

export default App;
