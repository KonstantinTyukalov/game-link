import "./index.css";

const { GamepadListener } = require("gamepad.js");

declare const window: { addEventListener(...args: unknown[]): void };

window.addEventListener("load", () => {
  const listener = new GamepadListener();

  listener.on("gamepad:connected", (event: any) => {
    const { gamepad } = event.detail;

    console.log("Connected");
  });

  listener.on("gamepad:disconnected", (event: any) => {
    const { gamepad } = event.detail;

    console.log("Disconnected");
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
    const { button, pressed } = event.detail;
    if (button == "6") {
      console.log("s " + pressed);
    } else if (button == "4") {
      console.log("w " + pressed);
    } else if (button == "5") {
      console.log("d " + pressed);
    } else if (button == "7") {
      console.log("a " + pressed);
    } else {
      console.log(button, pressed);
    }
  });

  listener.start();
});

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
