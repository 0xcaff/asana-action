import { getAuthorizationEndpoint } from "./asana";
import { rawIds } from "./clients";

it("should generate the correct authorization endpoint", () => {
  const asana = rawIds.development.asana;
  const actual = getAuthorizationEndpoint({
    clientId: asana.clientId,
    redirectUri: asana.redirectUri,
    responseType: "token",
    state: "PARAM"
  });

  const expected =
    "https://app.asana.com/-/oauth_authorize?response_type=token&client_id=806084040989198&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fasana%2Foauth&state=PARAM";

  expect(actual).toEqual(expected);
});
