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
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag
 *
 */

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

console.log(
  `This app is running in ${window.electronAPI.env.mode()} mode with Chrome (v${window.electronAPI.versions.chrome()}), Node.js (v${window.electronAPI.versions.node()}) and Electron (v${window.electronAPI.versions.electron()})`,
);
