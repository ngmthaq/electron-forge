// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { ForceQuitCallback } from "./window";
import { APP_CONSTANTS } from "./const/app";

contextBridge.exposeInMainWorld("electronAPI", {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },

  env: {
    get: (key: string): string | undefined => {
      const env: Record<string, string> = {};
      for (const key in process.env) {
        if (Object.prototype.hasOwnProperty.call(process.env, key)) {
          const value = process.env[key];
          if (key.startsWith("ELECTRON_PUBLIC_")) {
            env[key] = value;
          }
        }
      }

      return env[key];
    },

    mode: () => process.env.NODE_ENV,
  },

  onForceQuit: (callback: ForceQuitCallback) => {
    ipcRenderer.on(APP_CONSTANTS.mainProcessEvents.forceQuit, callback);
  },
});
