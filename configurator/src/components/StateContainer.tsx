import * as React from "react";

interface Props {
  children: (params: Params) => React.ReactNode;
  onSetAuthToken: (newAuthToken?: string) => void;
}

interface Params {
  authToken?: string;
  setAuthToken: (newAuthToken: string) => void;
}

interface State {
  authToken?: string;
}

export class StateContainer extends React.Component<Props, State> {
  public state: State = {};

  constructor(props: Props) {
    super(props);

    this.state = {
      authToken: window.localStorage.getItem("authToken") as string
    };

    this.props.onSetAuthToken(this.state.authToken);
  }

  public render = () =>
    this.props.children({
      authToken: this.state.authToken,
      setAuthToken: authToken => {
        this.props.onSetAuthToken(authToken);
        window.localStorage.setItem("authToken", authToken);
        this.setState({ authToken });
      }
    });
}
