import { subscribeToMouseEvents } from "./subscribers/mouse-events";
import { subscribeToKeyboardEvents } from "./subscribers/keyboard-events";
import "./index.css";

declare const window: { bridge: unknown };

console.log("window.bridge ", window.bridge);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

subscribeToMouseEvents(document);

subscribeToKeyboardEvents(document);

const bridge = (window as any).bridge;

document
  .getElementById("space_invaders_button")
  .addEventListener("click", () => {
    bridge.ipcRenderer.send("game", "space_invaders");
  });
document.getElementById("minecraft_button").addEventListener("click", () => {
  bridge.ipcRenderer.send("game", "minecraft");
});
document.getElementById("tetris_button").addEventListener("click", () => {
  bridge.ipcRenderer.send("game", "tetris");
});
