import * as React from "react";

interface Props {
  options: Options;
  children: React.ReactNode;
}

export const AsanaSignIn = (props: Props) => (
  <a href={getAuthorizationEndpoint(props.options)}>{props.children}</a>
);

interface Options {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
}

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
