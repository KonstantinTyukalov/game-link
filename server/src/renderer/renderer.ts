import "./index.css";

declare const window: { bridge: unknown };

console.log(window.bridge);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
