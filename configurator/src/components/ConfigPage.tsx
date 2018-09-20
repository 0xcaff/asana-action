import * as React from "react";

import { AsanaQuery } from "./AsanaQuery";
import { WorkspacePicker } from "./WorkspacePicker";
import { SetDefaultWorkspaceMutation } from "./SetDefaultWorkspaceMutation";
import { FullPageError, FullPageLoading } from "./styledComponents";
import { authLink } from "../graphql/client";

interface Props {
  linkState?: string;
}

export const ConfigPage = (props: Props) => (
  <AsanaQuery>
    {queryResult => {
      if (queryResult.error) {
        return (
          <FullPageError>
            Backend Error. {queryResult.error.message}
          </FullPageError>
        );
      }

      if (queryResult.loading || !queryResult.data) {
        return <FullPageLoading />;
      }

      const myAsana = queryResult.data.me.asana;
      return (
        <React.Fragment>
          <SetDefaultWorkspaceMutation>
            {(mutateFn, results) => (
              <WorkspacePicker
                loading={results.loading}
                workspaces={myAsana.workspaces}
                chosenWorkspaceId={
                  myAsana.chosenWorkspace && myAsana.chosenWorkspace.id
                }
                choseWorkspace={workspaceId =>
                  mutateFn({ variables: { workspaceId } })
                }
              />
            )}
          </SetDefaultWorkspaceMutation>
          {props.linkState && (
            <AssistantLinkResult
              linkState={props.linkState}
              token={authLink.getToken()}
            >
              Return to Google Assistant
            </AssistantLinkResult>
          )}
        </React.Fragment>
      );
    }}
  </AsanaQuery>
);

interface LinkResultProps {
  linkState: string;
  token: string | undefined;
  children: React.ReactNode;
}

export const AssistantLinkResult = (props: LinkResultProps) => (
  <a
    href={`https://oauth-redirect.googleusercontent.com/r/asana-e43ee#access_token=${
      props.token
    }&token_type=bearer&state=${props.linkState}`}
  >
    {props.children}
  </a>
);
