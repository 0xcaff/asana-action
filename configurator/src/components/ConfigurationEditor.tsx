import * as React from "react";
import { Content } from "./styledComponents";
import { WorkspacePicker } from "./WorkspacePicker";
import { Workspace } from "./AsanaQuery";
import styled from "styled-components";

interface Props {
  loading: boolean;
  workspaces: Workspace[];
  chosenWorkspaceId: string | null;
  chooseWorkspace: (workspaceId: string) => void;
  linkState?: string;
  token?: string;
}

export const ConfigurationEditor = (props: Props) => (
  <Content>
    <WorkspacePicker
      loading={props.loading}
      workspaces={props.workspaces}
      chosenWorkspaceId={props.chosenWorkspaceId}
      choseWorkspace={props.chooseWorkspace}
    />
    {props.linkState && (
      <AssistantLinkResult linkState={props.linkState} token={props.token}>
        Return to Google Assistant
      </AssistantLinkResult>
    )}
  </Content>
);

interface LinkResultProps {
  linkState: string;
  token: string | undefined;
  children: React.ReactNode;
}

const AssistantLink = styled.a`
  padding-top: 3em;
`;

export const AssistantLinkResult = (props: LinkResultProps) => (
  <AssistantLink
    href={`https://oauth-redirect.googleusercontent.com/r/asana-e43ee#access_token=${
      props.token
    }&token_type=bearer&state=${props.linkState}`}
  >
    {props.children}
  </AssistantLink>
);
