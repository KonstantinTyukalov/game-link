import { mouseMoveHandler, mouseClickHandler } from "../input-handlers";

export const subscribeToMouseEvents = (document: Document): void => {
  document.addEventListener("mousemove", (event) => {
    mouseMoveHandler(event);
  });

  document.addEventListener("mouseup", (event) => {
    mouseClickHandler(event);
  });

  document.addEventListener("mousedown", (event) => {
    mouseClickHandler(event);
  });

  document.addEventListener("click", (event) => {
    mouseClickHandler(event);
  });
};
