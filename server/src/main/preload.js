const { contextBridge, ipcRenderer, desktopCapturer } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
  },
  desktopCapturer: {
    async getEntireScreenSource() {
      const sources = await desktopCapturer.getSources({ types: ["screen"] });
      return sources.find((x) => x.name === "Entire Screen");
    },
  },
});
