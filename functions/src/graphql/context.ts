import { Request } from "express";
import { verify } from "../auth";
import { db, User } from "../database";

/**
 * GraphQL context provided to all resolvers.
 */
export interface Context {
  /**
   * User associated with the request.
   */
  user?: User;
}

interface ContextSource {
  req: Request;
}

/**
 * Constructs a {@link Context} from a request. Gets user information from a
 * JWT token from the Authorization header. If no Authorization header is
 * provided, the user is empty.
 *
 * @param source Source from which the request is created
 */
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

/**
 * Gets the user from a context throwing if there is no user associated.
 *
 * @param ctx Context to get user from
 */
export const ensureUser = (ctx: Context): User => {
  if (!ctx.user) {
    throw new Error("User Not Signed In");
  }

  return ctx.user;
};
