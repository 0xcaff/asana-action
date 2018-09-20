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
    me: () => ({})
  },

  User: {
    id: (_parent: void, _args, context: Context): string =>
      ensureUser(context).id,

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
