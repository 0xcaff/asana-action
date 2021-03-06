interface Options {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
}

/**
 * Builds the asana authorization endpoint url based on some options.
 */
export const getAuthorizationEndpoint = (options: Options): string => {
  const rawParams = {
    response_type: options.responseType,
    client_id: options.clientId,
    redirect_uri: options.redirectUri,
    state: options.state
  };

  const params = new URLSearchParams(rawParams);

  const url = new URL("https://app.asana.com/-/oauth_authorize");
  url.search = params.toString();

  return url.toString();
};
