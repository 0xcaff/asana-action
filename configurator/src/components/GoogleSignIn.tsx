import * as React from "react";

import {
  GAPI,
  loaded,
  getGapi,
  GoogleUser,
  Auth2Instance,
  AuthResponse
} from "../GAPI";

interface Props {
  clientId: string;

  onSignInChanged: (response: AuthResponse) => void;
}

interface State {
  loaded: boolean;
}

export class GoogleSignIn extends React.Component<Props, State> {
  public state = { loaded: false };

  private async initSignIn(gapi: GAPI): Promise<Auth2Instance> {
    await loaded(gapi, "auth2");
    const auth2 = gapi.auth2.init({ clientId: this.props.clientId });
    return auth2;
  }

  public async componentDidMount() {
    const gapi = await getGapi();
    await this.initSignIn(gapi);
    this.setState({ loaded: true });
  }

  private onRef = async (e: HTMLDivElement | null) => {
    if (e == null) {
      return;
    }

    const gapi = await getGapi();
    await this.initSignIn(gapi);

    gapi.signin2.render(e, {
      scope: "profile email",
      onsuccess: this.onSuccess,
      onfailure: console.log
    });
  };

  private onSuccess = (googleUser: GoogleUser) => {
    const authResponse = googleUser.getAuthResponse();
    this.props.onSignInChanged(authResponse);
  };

  public render() {
    return this.state.loaded ? (
      <div style={{ height: 36, width: 120 }} ref={this.onRef} />
    ) : (
      <div>Loading...</div>
    );
  }
}
