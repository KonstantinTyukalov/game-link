import "./index.css";

const { GamepadListener } = require("gamepad.js");

declare const window: { addEventListener(...args: unknown[]): void };

window.addEventListener("load", () => {
  const listener = new GamepadListener();

  listener.on("gamepad:connected", (event: any) => {
    const { index, gamepad } = event.detail;

    console.log(index, gamepad);
  });

  listener.on("gamepad:disconnected", (event: any) => {
    const { index } = event.detail;

    console.log(index);
  });

  listener.on("gamepad:axis", (event: any) => {
    const { index, stick, axis, value } = event.detail;
    if (stick == 0) {
    }
    console.log(
      "Index:" + index,
      "Stick:" + stick,
      "Axis:" + axis,
      "Value:" + value
    );
  });

  listener.on("gamepad:button", (event: any) => {
    const { index, button, value, pressed } = event.detail;
    console.log(index, button, value, pressed);
  });

  listener.start();
});

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
