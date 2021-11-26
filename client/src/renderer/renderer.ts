import { subscribeToMouseEvents } from "../main/subscribers/mouse-events";
import { subscribeToKeyboardEvents } from "../main/subscribers/keyboard-events";

declare const window: { bridge: any };

console.log("window.bridge ", window.bridge);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
const bridge = window.bridge;

subscribeToMouseEvents(document);

subscribeToKeyboardEvents(document);
