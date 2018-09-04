export const rawIds = {
  development: {
    google: {
      clientId:
        "942954643395-0dngcnr16e988cc91262vgln9scfug8u.apps.googleusercontent.com"
    },
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
  google: Google;
  asana: Asana;
}

interface Google {
  clientId: string;
}

interface Asana {
  clientId: string;
  redirectUri: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const ids: Identifiers = isProduction
  ? { ...rawIds.development, ...rawIds.production }
  : rawIds.development;
