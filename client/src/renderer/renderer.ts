// import { subscribeToMouseEvents } from "./subscribers/mouse-events";
import { subscribeToKeyboardEvents } from "./subscribers/keyboard-events";

declare const window: { bridge: unknown };

console.log("window.bridge ", window.bridge);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

// subscribeToMouseEvents(document);

subscribeToKeyboardEvents(document);
