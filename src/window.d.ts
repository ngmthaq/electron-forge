export type Versions = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

declare global {
  interface Window {
    versions: Versions;
  }
}
