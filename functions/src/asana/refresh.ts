import {
  Database,
  AccessToken as DatabaseAccessToken,
  User as DatabaseUser
} from "../database";
import { AccessToken, refreshAccessToken } from "./auth";
import { credentials } from "./credentials";
import { getTime } from "../time";

export const convertToDatabaseToken = (
  token: AccessToken
): DatabaseAccessToken => ({
  token: token.access_token,
  expiryTime: getTime() + token.expires_in
});

/**
 * Refreshes the token held by the user variable if needed. The values in user
 * are mutated.
 *
 * @param user Container for token information.
 */
async function refreshTokenIfNeeded(user: DatabaseUser): Promise<void> {
  const currentTime = getTime();

  if (currentTime < user.accessToken.expiryTime - 60) {
    return;
  }

  const token = await refreshAccessToken(user.refreshToken, credentials);
  user.accessToken = convertToDatabaseToken(token);

  return;
}

export async function refreshAndSaveToken(
  user: DatabaseUser,
  db: Database
): Promise<void> {
  await refreshTokenIfNeeded(user);
  await db.updateUser(user);
}
