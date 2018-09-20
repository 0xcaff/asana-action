import { db, User } from "../database";
import { Context } from "./context";
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

    const user: User = {
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
    if (!context.user) {
      throw new Error("Authorization Required");
    }

    await db.updateUser({
      ...context.user,
      chosenWorkspaceId: args.id
    });

    return {};
  }
};
