import { keyboardInputHandler } from "../input-handlers";

export const subscribeToKeyboardEvents = (document: Document): void => {
  let lastEvent: string;
  document.addEventListener("keydown", (event) => {
    if (lastEvent != "keydown") {
      keyboardInputHandler(event);
    }
    lastEvent = "keydown";
  });

  document.addEventListener("keyup", (event) => {
    keyboardInputHandler(event);
    lastEvent = "keyup";
  });
};
