import { MousePressEvent } from "../../main/interfaces/MousePressEvent";

export const mouseDownHandler = (event: MouseEvent): void => {
  const { button } = event;
  const customEvent: MousePressEvent = {
    button,
    type: "mouse:press",
    down: true,
  };

  const bridge = (window as any).bridge;
  bridge.ipcRenderer.send("mouseevent", customEvent);
};
