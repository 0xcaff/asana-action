import { ApolloLink, Operation, NextLink } from "apollo-link";

export class AuthLink extends ApolloLink {
  private token?: string;

  public request(operation: Operation, forward: NextLink) {
    if (this.token) {
      operation.setContext(() => ({ headers: { authorization: this.token } }));
    }

    return forward(operation);
  }

  public setToken(newToken?: string) {
    this.token = newToken;
  }

  public getToken() {
    return this.token;
  }
}
