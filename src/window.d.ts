export type Versions = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type ElectronAPI = {
  versions: Versions;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
