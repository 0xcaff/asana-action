import * as React from "react";
import styled from "styled-components";

import { GoogleSignIn } from "./GoogleSignIn";
import { ids } from "../clients";
import { Redirect } from "react-router";
import { configurationPage } from "../paths";
import assistantLogo from "../logos/googleAssistant.svg";
import asanaLogo from "../logos/asana.png";

interface Props {
  token?: string;
  setAuthenticationToken: (authToken: string) => void;
}

export const LandingPage = (props: Props) =>
  props.token ? (
    <Redirect to={configurationPage} />
  ) : (
    <React.Fragment>
      <Background>
        <Circle />

        <LogosContainer>
          <AsanaLogo />+<AssistantLogo />
        </LogosContainer>
      </Background>

      <CircleContainer>
        <Heading>Asana + Google Assistant</Heading>

        <LeadText>
          A unofficial tool to add tasks to Asana from Google Assistant. Sign in
          to get started.
        </LeadText>

        <Action>
          <GoogleSignIn
            clientId={ids.google.clientId}
            onSignInChanged={token => {
              props.setAuthenticationToken(token.id_token);
            }}
          />
        </Action>
      </CircleContainer>
    </React.Fragment>
  );

const white = "#fcfcfc";
const purple = "#9287ff";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  background: ${white};

  display: flex;
`;

const Circle = styled.div`
  border-radius: 50%;
  background: ${purple};

  width: 2000px;
  height: 2000px;

  margin-left: -1000px;
  margin-top: calc(-1000px + 50vh);
`;

const CircleContainer = styled.div`
  max-width: 900px;
  margin-top: 33vh;
  box-sizing: border-box;
  padding-left: 10em;
  padding-right: 10em;
`;

const Heading = styled.h1`
  font-size: 2.3rem;
  font-weight: normal;
  color: ${white};
`;

const LeadText = styled.div`
  font-size: 1.375rem;
  color: ${white};
`;

const Action = styled.div`
  margin-top: 3em;
`;

const LogosContainer = styled.div`
  flex: 1;
  align-self: center;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  padding-left: 2em;
  padding-right: 2em;
  font-size: 3rem;
`;

const AssistantLogo = styled.img.attrs({ src: assistantLogo })`
  height: 100px;

  margin-left: 1em;
`;

const AsanaLogo = styled.img.attrs({ src: asanaLogo })`
  height: 75px;
  width: auto;

  margin-right: 1em;
`;
