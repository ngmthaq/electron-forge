import path from "path";
import { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import icon from "./assets/icons/icon.png";
import { APP_CONSTANTS } from "./const/app";
import "dotenv/config";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Force disable security warnings
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Logo path resolve from `/.webpack/main/index.js` entry point
const logo = nativeImage.createFromPath(path.resolve(__dirname, icon));

// Is force quit?
let isForceQuit = false;

// Create the browser window.
const createWindow = (): void => {
  // Create main window
  const mainWindow = new BrowserWindow({
    icon: logo,
    minWidth: 1280,
    minHeight: 720,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.NODE_ENV === "development") {
    // Install extension
    installExtension(VUEJS_DEVTOOLS).then(() => {
      mainWindow.webContents.openDevTools({ mode: "right" });
    });
  }

  // Open application in fullscreen
  mainWindow.maximize();

  // Hide the main window instead of close this
  mainWindow.on("close", (e) => {
    if (!isForceQuit) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // Setup tray icon
  const tray = new Tray(logo.resize({ width: 16, height: 16 }));
  tray.setIgnoreDoubleClickEvents(true);

  // Set tray context menu
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open",
        click: () => {
          mainWindow.show();
        },
      },
      {
        label: "Quit",
        click: () => {
          mainWindow.webContents.send(APP_CONSTANTS.mainProcessEvents.forceQuit);
        },
      },
    ]),
  );

  // Show main window when db click in tray icon
  tray.on("double-click", () => {
    mainWindow.show();
  });

  ipcMain.on(APP_CONSTANTS.mainProcessEvents.acceptForceQuit, () => {
    isForceQuit = true;
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
