/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `index.ts` and enable the `nodeIntegration` flag.
 *
 */

import { createApp } from "vue";
import App from "./App.vue";
import { APP_CONSTANTS } from "./const/app";
import { router } from "./plugins/route";
import { store } from "./plugins/store";
import { i18n } from "./plugins/i18n";
import { eventBus } from "./plugins/bus";
import "bootstrap-icons/font/bootstrap-icons.scss";

const app = createApp(App);

app.use(router);

app.use(store);

app.use(i18n);

app.config.errorHandler = (error: any) => {
  eventBus.emit(APP_CONSTANTS.eventBus.executeInternalError, error);
};

app.mount("#app");

if (window.electronAPI.env.mode() === "development") {
  console.log(`This app is running with:
    Chrome (v${window.electronAPI.versions.chrome()}), 
    Node.js (v${window.electronAPI.versions.node()}),
    Electron (v${window.electronAPI.versions.electron()})`);
}
