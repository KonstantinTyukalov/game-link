import { MouseMoveEvent } from "../../main/interfaces/MouseMoveEvent";

export const mouseMoveHandler = (event: MouseEvent): void => {
  const bridge = (window as any).bridge;

  const { clientX, clientY } = event;

  const mme: MouseMoveEvent = {
    x: clientX,
    y: clientY,
    type: "mouse:move",
  };
  console.log({ mme });
  bridge.ipcRenderer.send("mouseevent", mme);
};
