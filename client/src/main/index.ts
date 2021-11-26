import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { io } from "socket.io-client";

ipcMain.on("keyboardevent", (event, args) => {
  console.log(args); // prints "ping"
});

ipcMain.on("mouseevent", (event, args) => {
  console.log(args); // prints "ping"
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
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

  // and load the index.html of the app.
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  window.webContents.openDevTools();

  const socket = io("http://localhost:9002");

  socket.on("stream:offer", (description) => {
    ipcMain.emit("stream:offer", description);
  });

  ipcMain.on("stream:answer", (_, description) => {
    socket.emit("stream:answer", description);
  });
};

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
