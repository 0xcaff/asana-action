import * as React from "react";
import styled from "styled-components";

import assistantLogo from "../logos/googleAssistant.svg";
import asanaLogo from "../logos/asana.png";
import { Background, BigCircle, Heading, white } from "./styledComponents";

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
        A unofficial tool to add tasks to Asana using Google Assistant.
      </LeadText>

      <Action>
        Try it by saying
        <ActionPrompt>
          Ok Google, Tell Asana Unofficial to add task "Cook Food"
        </ActionPrompt>
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
  padding-right: 5em;
`;

const LeadText = styled.div`
  font-size: 1.375rem;
  color: ${white};
`;

const Action = styled.div`
  margin-top: 3em;
  color: ${white};
  font-size: 1.375rem;
`;

const ActionPrompt = styled.div`
  color: ${white};
  padding-top: 1em;
  padding-left: 1em;
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
