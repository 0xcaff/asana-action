import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

import { GoogleSignIn } from "./GoogleSignIn";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <GoogleSignIn
          clientId="942954643395-0dngcnr16e988cc91262vgln9scfug8u.apps.googleusercontent.com"
          onSignInChanged={console.log}
        />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
