import {
  mouseMoveHandler,
  mouseUpHandler,
  mouseDownHandler,
} from "../input-handlers";

export const subscribeToMouseEvents = (document: Document): void => {
  document.addEventListener("mousemove", (event) => {
    mouseMoveHandler(event);
  });

  document.addEventListener("mouseup", (event) => {
    mouseUpHandler(event);
  });

  document.addEventListener("mousedown", (event) => {
    mouseDownHandler(event);
  });
};
