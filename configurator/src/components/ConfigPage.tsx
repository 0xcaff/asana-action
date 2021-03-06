import * as React from "react";

import { AsanaQuery } from "./graphql/AsanaQuery";
import { SetDefaultWorkspaceMutation } from "./graphql/SetDefaultWorkspaceMutation";
import { FullPageError, FullPageLoading } from "./styledComponents";
import { authLink } from "../graphql/client";
import { ConfigurationEditor } from "./ConfigurationEditor";

interface Props {
  linkState?: string;
}

/**
 * Configuration page. User is sent here after they've provided their Asana
 * credentials.
 */
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
