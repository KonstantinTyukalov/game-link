const { contextBridge, ipcRenderer, } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
  },
});
