import * as React from "react";
import styled from "styled-components";

import assistantLogo from "../logos/googleAssistant.svg";
import asanaLogo from "../logos/asana.png";
import {
  Background,
  BigCircle,
  black,
  Heading,
  white
} from "./styledComponents";
import { asanaAuthorizationUrl } from "../asana";

export const LandingPage = () => (
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
        A unofficial tool to add tasks to Asana from Google Assistant.
      </LeadText>

      <Action>
        <ActionLink href={asanaAuthorizationUrl}>Get Started!</ActionLink>
      </Action>
    </CircleContainer>
  </React.Fragment>
);

const Circle = styled(BigCircle)`
  position: absolute;
  left: -1000px;
  top: calc(-1000px + 50vh);
`;

const CircleContainer = styled.div`
  max-width: 900px;
  margin-top: 33vh;
  box-sizing: border-box;
  padding-left: 10em;
  padding-right: 10em;
`;

const LeadText = styled.div`
  font-size: 1.375rem;
  color: ${white};
`;

const Action = styled.div`
  margin-top: 3em;
`;

const LogosContainer = styled.div`
  margin-left: 1000px;
  flex: 1;

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

const ActionLink = styled.a`
  display: inline-block;

  padding-left: 24px;
  padding-right: 24px;
  height: 45px;
  line-height: 45px;
  border-radius: 3px;

  text-decoration: none;
  color: ${black};
  background: ${white};
  transition: background-color 0.15s;

  &:hover {
    background: #ddd;
  }
`;
