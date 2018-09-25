import * as React from "react";

import { Workspace } from "./graphql/AsanaQuery";
import { DarkHeading } from "./styledComponents";

interface Props {
  workspaces: Workspace[];
  loading: boolean;
  chosenWorkspaceId: string | null;
  choseWorkspace: (newWorkspaceId: string) => void;
}

/**
 * Picker for an Asana workspace.
 */
export const WorkspacePicker = (props: Props) => (
  <React.Fragment>
    <DarkHeading>Choose a default workspace:</DarkHeading>

    <select
      value={props.chosenWorkspaceId || ""}
      onChange={event => props.choseWorkspace(event.target.value)}
      disabled={props.loading}
    >
      <React.Fragment>
        <option disabled value="" />
        {props.workspaces.map(workspace => (
          <option key={workspace.id} value={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </React.Fragment>
    </select>

    {props.loading && <span>Loading...</span>}
  </React.Fragment>
);
