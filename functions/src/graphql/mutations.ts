import { db, User } from "../database";
import { Context, ensureUser } from "./context";
import {
  exchangeAuthorizationCode,
  convertToDatabaseToken,
  getMe
} from "../asana";
import { credentials } from "../asana/credentials";
import { IResolverObject } from "apollo-server-express";
import { sign } from "../auth";

interface AuthResponse {
  token: string;
}

export const mutations: IResolverObject<void, Context> = {
  async linkAsana(_: void, args): Promise<AuthResponse> {
    const token = await exchangeAuthorizationCode(
      args.authorizationCode,
      credentials
    );
    const accessToken = convertToDatabaseToken(token);
    const me = await getMe(accessToken.token);

    const previousUser = await db.getUser(me.gid);
    const user: User = {
      ...previousUser,
      id: me.gid,
      accessToken: convertToDatabaseToken(token),
      refreshToken: token.refresh_token,
      email: me.email,
      name: me.name
    };

    await db.updateUser(user);
    const localAccessToken = await sign({ sub: me.gid });

    return { token: localAccessToken };
  },

  async setDefaultWorkspace(_: void, args, context: Context): Promise<{}> {
    const oldUser = ensureUser(context);
    await db.updateUser({
      ...oldUser,
      chosenWorkspaceId: args.id
    });

    return {};
  }
};
