export interface GAPI {
  load: (api: string, callback: () => void) => void;
  signin2: SignIn2;
  auth2: Auth2;
}

export interface Auth2 {
  init: (opts: { clientId: string }) => Auth2Instance;
}

export interface Auth2Instance {
  isSignedIn: LiveData;
  currentUser: LiveData;
}

interface LiveData {
  listen: (callback: (args: any) => void) => void;
}

export interface SignIn2 {
  render: (
    element: HTMLElement,
    opts: {
      scope: string;
      onsuccess: (user: GoogleUser) => void;
      onfailure: (err: any) => void;
    }
  ) => void;
}

export interface GoogleUser {
  getAuthResponse(): AuthResponse;
}

export interface AuthResponse {
  id_token: string;
}

const loadScript = (url: string): Promise<void> => {
  const script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = reject;
  });
};

export const getGapi = async (): Promise<GAPI> => {
  await loadScript("https://apis.google.com/js/platform.js");
  return (window as any).gapi;
};

export const loaded = (gapi: GAPI, api: string): Promise<void> =>
  new Promise(resolve => {
    gapi.load(api, () => resolve());
  });
