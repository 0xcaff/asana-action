/**
 * Asana client IDs and redirect uri's.
 */

export const rawIds = {
  development: {
    asana: {
      clientId: "806084040989198",
      redirectUri: "http://localhost:3000/asana/oauth"
    }
  },
  production: {
    asana: {
      clientId: "806084040989196",
      redirectUri: "https://asana-action.0xcaff.me/asana/oauth"
    }
  }
};

interface Identifiers {
  asana: Asana;
}

interface Asana {
  clientId: string;
  redirectUri: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const ids: Identifiers = isProduction
  ? rawIds.production
  : rawIds.development;
