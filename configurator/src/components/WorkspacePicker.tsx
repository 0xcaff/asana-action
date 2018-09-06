import { Workspace } from "./AsanaQuery";

interface Props {
  workspaces: Workspace[];
  chosenWorkspaceId?: string;
  choseWorkspace: (newWorkspaceId: string) => void;
}

// TODO: Implement
export const WorkspacePicker = (_props: Props) => null;
