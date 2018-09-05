import {
  Asana,
  Database,
  AccessToken as DatabaseAccessToken
} from "../database";
import { AccessToken, refreshAccessToken } from "./auth";
import { credentials } from "./credentials";

export const convertToDatabaseToken = (
  token: AccessToken
): DatabaseAccessToken => ({
  token: token.access_token,
  expiryTime: new Date().getSeconds() + token.expires_in
});

/**
 * Refreshes the token held by the asana variable if needed. The values in asana
 * are mutated.
 *
 * @param asana Container for token information.
 */
async function refreshTokenIfNeeded(asana: Asana): Promise<void> {
  const currentTime = new Date().getSeconds();

  if (currentTime < asana.accessToken.expiryTime - 60) {
    return;
  }

  const token = await refreshAccessToken(asana.refreshToken, credentials);
  asana.accessToken = convertToDatabaseToken(token);

  return;
}

export async function refreshAndSaveToken(
  asana: Asana,
  userId: string,
  db: Database
): Promise<void> {
  await refreshTokenIfNeeded(asana);
  await db.updateUser(userId, { asana });
}
