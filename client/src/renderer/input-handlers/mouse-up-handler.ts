import { MousePressEvent } from "../../main/interfaces/MousePressEvent";

export const mouseUpHandler = (event: MouseEvent): void => {
  const { button } = event;
  const customEvent: MousePressEvent = {
    button,
    type: "mouse:press",
    down: false,
  };

  const bridge = (window as any).bridge;
  bridge.ipcRenderer.send("mouseevent", customEvent);
};
