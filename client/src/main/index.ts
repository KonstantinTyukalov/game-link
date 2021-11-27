import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { io } from "socket.io-client";
import { CustomKeyboardEvent } from "./interfaces/CustomKeyboardEvent";
import { CustomMouseEvent } from "./interfaces/CustomMouseEvent";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(app.getAppPath(), "src", "main", "preload.js"),
    },
  });

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  window.webContents.openDevTools();
};

const socket = io("http://10.0.7.73:9001");

ipcMain.on("keyboardevent", (_, event: CustomKeyboardEvent) => {
  console.log("event at ipc main", { event });
  socket.emit("keyboardevent", event);
});

ipcMain.on("mouseevent", (_, event: CustomMouseEvent) => {
  console.log("event at ipc main", { event });
  socket.emit("mouseevent", event);
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
