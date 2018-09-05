import { Context } from "./context";
import { Asana, db } from "../database";
import {
  getWorkspace,
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
    id: (_parent: void, _args, context: Context): string => context.userId,

    async asana(_parent: void, _args, context: Context): Promise<Asana | null> {
      const user = await db.getUser(context.userId);
      return user.asana || null;
    }
  },

  AsanaInformation: {
    async workspaces(
      asana: Asana,
      _args,
      context: Context
    ): Promise<Workspace[]> {
      await refreshAndSaveToken(asana, context.userId, db);
      const workspaces = await getWorkspaces(asana.accessToken.token);
      return workspaces.map(mapWorkspace);
    },

    async chosenWorkspace(
      asana: Asana,
      _args,
      context: Context
    ): Promise<Workspace | null> {
      if (!asana.chosenWorkspaceId) {
        return null;
      }

      await refreshAndSaveToken(asana, context.userId, db);
      const workspace = await getWorkspace(
        asana.chosenWorkspaceId,
        asana.accessToken.token
      );
      return mapWorkspace(workspace);
    }
  } as IResolverObject<Asana, Context>
};
