import { keyboardInputHandler } from "../input-handlers";

export const subscribeToKeyboardEvents = (document: Document): void => {
  document.addEventListener("keypress", (event) => {
    keyboardInputHandler(event);
  });

  document.addEventListener("keydown", (event) => {
    keyboardInputHandler(event);
  });

  document.addEventListener("keyup", (event) => {
    keyboardInputHandler(event);
  });
};
