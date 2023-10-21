import { IpcRendererEvent } from "electron";

export type Versions = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type Env = {
  get: (key: string) => string | undefined;
  mode: () => "development" | "production";
};

export type ForceQuitCallback = (event: IpcRendererEvent, ...args: any[]) => void | Promise<void>;

export type ElectronAPI = {
  versions: Versions;
  env: Env;
  onForceQuit: (callback: ForceQuitCallback) => void;
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
