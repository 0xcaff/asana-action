import { Request } from "express";
import { verify } from "../auth";
import { db, User } from "../database";

export interface Context {
  user?: User;
}

interface ContextSource {
  req: Request;
}

export async function context(source: ContextSource): Promise<Context> {
  const request = source.req;
  const authorization = request.headers.authorization;
  if (!authorization) {
    return {};
  }

  const userInformation = await verify(authorization);
  const id = userInformation.sub;

  const user = await db.getUser(id);
  if (user) {
    return { user };
  }

  return {};
}

export const ensureUser = (ctx: Context): User => {
  if (!ctx.user) {
    throw new Error("User Not Signed In");
  }

  return ctx.user;
};
