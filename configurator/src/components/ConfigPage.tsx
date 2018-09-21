import * as React from "react";

import { AsanaQuery } from "./AsanaQuery";
import { SetDefaultWorkspaceMutation } from "./SetDefaultWorkspaceMutation";
import { FullPageError, FullPageLoading } from "./styledComponents";
import { authLink } from "../graphql/client";
import { ConfigurationEditor } from "./ConfigurationEditor";

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

      const user = queryResult.data.me;
      return (
        <SetDefaultWorkspaceMutation>
          {(mutateFn, results) => (
            <ConfigurationEditor
              loading={results.loading}
              workspaces={user.workspaces}
              chosenWorkspaceId={user.chosenWorkspaceId}
              chooseWorkspace={workspaceId =>
                mutateFn({ variables: { workspaceId } })
              }
              linkState={props.linkState}
              token={authLink.getToken()}
            />
          )}
        </SetDefaultWorkspaceMutation>
      );
    }}
  </AsanaQuery>
);
