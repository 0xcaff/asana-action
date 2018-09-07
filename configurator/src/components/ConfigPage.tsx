import * as React from "react";

import { AsanaQuery } from "./AsanaQuery";
import { getAuthorizationEndpoint } from "./asana";
import { ids } from "../clients";
import { Redirect } from "react-router";
import { googleSignInPage } from "../paths";
import { WorkspacePicker } from "./WorkspacePicker";
import { SetDefaultWorkspaceMutation } from "./SetDefaultWorkspaceMutation";
import { FullPageError, FullPageLoading } from "./styledComponents";

interface Props {
  authToken?: string;
}

export const ConfigPage = (props: Props) => {
  const authToken = props.authToken;
  if (!authToken) {
    return <Redirect to={googleSignInPage} />;
  }

  return (
    <AsanaQuery>
      {queryResult => {
        if (queryResult.error) {
          return <FullPageError />;
        }

        if (queryResult.loading || !queryResult.data) {
          return <FullPageLoading />;
        }

        if (!queryResult.data.me.asana) {
          window.location.assign(
            getAuthorizationEndpoint({
              responseType: "code",
              state: authToken,
              ...ids.asana
            })
          );

          return null;
        }

        const myAsana = queryResult.data.me.asana;
        return (
          <SetDefaultWorkspaceMutation>
            {mutateFn => (
              <WorkspacePicker
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
        );
      }}
    </AsanaQuery>
  );
};
