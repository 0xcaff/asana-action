import { URLSearchParams } from "url";
import { default as fetch, Response } from "node-fetch";

import { Credentials } from "./credentials";

/**
 * Exchanges an authorization code for a refresh token and access token. The
 * access token used for future requests.
 *
 * @param code Access code from the frontend
 * @param credentials Credentials identifying this client with Asana
 */
export const exchangeAuthorizationCode = async (
  code: string,
  credentials: Credentials
): Promise<RefreshToken & AccessToken> =>
  oauthToken<RefreshToken & AccessToken>(credentials, {
    grantType: "authorization_code",
    code
  });

/**
 * Uses a refresh token to get a new access token. The access token will be
 * used for future requests.
 *
 * @param refreshToken Refresh token gotten from authorization code
 * @param credentials Credentials identifying this client with Asana
 */
export const refreshAccessToken = async (
  refreshToken: string,
  credentials: Credentials
): Promise<AccessToken> =>
  oauthToken<AccessToken>(credentials, {
    grantType: "refresh_token",
    refreshToken
  });

type GrantType = "authorization_code" | "refresh_token";

async function oauthToken<T>(
  credentials: Credentials,
  options: { grantType: GrantType; refreshToken?: string; code?: string }
): Promise<T> {
  const body = new URLSearchParams({
    grant_type: options.grantType,
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
    redirect_uri: credentials.redirectUri,
    refresh_token: options.refreshToken,
    code: options.code
  });

  const resp = await fetch("https://app.asana.com/-/oauth_token", {
    method: "POST",
    body
  });

  return await unwrapAuthResponse<T>(resp);
}

async function unwrapAuthResponse<T>(resp: Response): Promise<T> {
  if (resp.status !== 200) {
    throw await resp.text();
  }

  const json = await resp.json();
  if (json.error) {
    throw json;
  }

  return json;
}

export interface AccessToken {
  /**
   * The token to use in future requests against the API
   */
  access_token: string;

  /**
   * The number of seconds the token is valid, typically 3600 (one hour)
   */
  expires_in: number;

  /**
   * The type of token, in our case, `bearer`
   */
  token_type: string;

  /**
   * A JSON object encoding a few key fields about the logged-in user, currently
   * `id`, `name`, and `email`.
   */
  data: Object;
}

interface RefreshToken {
  /**
   * If exchanging a code, a long-lived token that can be used to get new access
   * tokens when old ones expire.
   */
  refresh_token: string;
}
