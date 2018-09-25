import { Context, ensureUser } from "./context";
import { db } from "../database";
import {
  getWorkspaces,
  refreshAndSaveToken,
  Workspace as APIWorkspace
} from "../asana";
import { IResolverObject } from "apollo-server-express";

interface Workspace {
  id: string;
  name: string;
}

const mapWorkspace = (apiWorkspace: APIWorkspace): Workspace => ({
  id: apiWorkspace.gid,
  name: apiWorkspace.name
});

export const queries: IResolverObject<void, Context> = {
  Query: {
    // Returns a truth-y value so the User resolver is activated. Only one
    // user's information can be gotten for a context so no additional
    // information needs to be sent.
    me: () => ({})
  },

  User: {
    id: (_parent: void, _args, context: Context): string =>
      ensureUser(context).id,

    // I chose to put the workspace requesting in the backend because it avoids
    // the complexity of making requests to Asana on both the server and client.
    // IFTTT seems push all communication with third parties to the backend
    // also.
    async workspaces(
      _parent: void,
      _args,
      context: Context
    ): Promise<Workspace[]> {
      const user = ensureUser(context);
      await refreshAndSaveToken(user, db);
      const workspaces = await getWorkspaces(user.accessToken.token);
      return workspaces.map(mapWorkspace);
    },

    chosenWorkspaceId: (
      _parent: void,
      _args,
      context: Context
    ): string | undefined => ensureUser(context).chosenWorkspaceId
  }
};
