import { app, BrowserWindow } from "electron";
import { createServer } from "http";
import { Server } from "socket.io";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the index.html of the app.
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  window.webContents.openDevTools();
};

const httpServer = createServer();

const setupSockets = () => {
  const io = new Server(httpServer);

  io.on("connection", () => {
    console.log("New connection");
  });

  // io.on("input:mouseevents", (args) => {});
};

httpServer.listen(9001);

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    setupSockets();
  }
});
