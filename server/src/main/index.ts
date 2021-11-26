import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
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

  const httpServer = createServer();
  const io = new Server(httpServer);

  window.webContents.on("dom-ready", () => {
    io.sockets.on("connection", (socket) => {
      window.webContents.send("stream:connection");

      ipcMain.on("stream:offer", (_, description) => {
        socket.emit("stream:offer", description);
      });

      ipcMain.on("stream:candidate", (_, candidate) => {
        window.webContents.send("stream:cadindate", candidate);
      });

      socket.on("stream:answer", (description) => {
        window.webContents.send("stream:answer", description);
      });
    });
  });

  // const peerServer = PeerServer({ port: 9002, path: "/streaming" });
  // peerServer.listen();

  httpServer.listen(9002);
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
