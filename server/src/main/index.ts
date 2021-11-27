import { app, BrowserWindow } from "electron";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { hadnleKeyboardEvent } from "./input-handlers/keyboard-input-handlers";
import { handleMouseInput } from "./input-handlers/mouse-input-handlers";
import { CustomKeyboardEvent } from "./interfaces/CustomKeyboardEvent";
import { CustomMouseEvent } from "./interfaces/CustomMouseEvent";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const setupSocketConnection = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer);

  io.on("connection", (socket) => {
    console.log("New connection: ", socket.id);
    socket.on("keyboardevent", (event: CustomKeyboardEvent) => {
      console.log(event);
      hadnleKeyboardEvent(event);
    });
    socket.on("mouseevent", (event: CustomMouseEvent) => {
      console.log({ event });
      handleMouseInput(event);
    });
  });
};

const createWindow = (): void => {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the index.html of the app.
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  window.webContents.openDevTools();
  const httpServer = createServer();

  setupSocketConnection(httpServer);

  httpServer.listen(9001);
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
