import { isDevelopment } from "../env";

export interface Credentials {
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}

const dev: Credentials = {
  redirectUri: "http://localhost:3000/asana/oauth",
  clientId: "806084040989198",
  clientSecret: "fd1e26b9f5b30899107789b7fb2746c0"
};

const prod: Credentials = {
  redirectUri: "https://asana-action.0xcaff.me/asana/oauth",
  clientId: "806084040989196",
  clientSecret: "7e491593a43fef4ff574fe7f07068c30"
};

export const credentials = isDevelopment ? dev : prod;
