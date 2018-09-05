import { OAuth2Client } from "google-auth-library";
import { Request } from "express";

/**
 * The google client identifier the proof should be for.
 */
const clientId =
  "942954643395-0dngcnr16e988cc91262vgln9scfug8u.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

export interface Context {
  userId: string;
}

async function verify(idToken: string): Promise<string> {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: clientId
  });

  if (!ticket) {
    throw new TypeError("ticket is null for some reason");
  }

  const payload = ticket.getPayload();
  if (!payload) {
    throw new TypeError("ticket payload is null for some reason");
  }

  return payload.sub;
}

interface ContextSource {
  req: Request;
}

export async function context(source: ContextSource): Promise<Context> {
  const request = source.req;
  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new TypeError("No Authorization Header Provided");
  }

  const userId = await verify(authorization);

  return { userId };
}
