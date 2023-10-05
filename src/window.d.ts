export type Versions = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type Env = {
  get: (key: string) => string | undefined;
  mode: () => string;
};

export type ElectronAPI = {
  versions: Versions;
  env: Env;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
