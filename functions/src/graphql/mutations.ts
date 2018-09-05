import { db } from "../database";
import { Context } from "./context";
import { exchangeAuthorizationCode } from "../asana";
import { credentials } from "../asana/credentials";
import { convertToDatabaseToken } from "../asana/refresh";
import { IResolverObject } from "apollo-server-express";

export const mutations: IResolverObject<void, Context> = {
  async linkAsana(_: void, args, context: Context): Promise<{}> {
    const token = await exchangeAuthorizationCode(
      args.authorizationCode,
      credentials
    );
    const user = {
      asana: {
        accessToken: convertToDatabaseToken(token),
        refreshToken: token.refresh_token
      }
    };

    await db.updateUser(context.userId, user);

    return {};
  },

  async setDefaultWorkspace(_: void, args, context: Context): Promise<{}> {
    const user = await db.getUser(context.userId);
    if (!user.asana) {
      throw new TypeError("setDefaultWorkspace called before linking asana");
    }

    user.asana.chosenWorkspaceId = args.id;
    await db.updateUser(context.userId, user);

    return {};
  }
};
