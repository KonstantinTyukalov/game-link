import robot from "robotjs";
import { RobotjsMouseConverter } from "../../utils/robotjs-mouse-converter";
import { CustomMouseEvent } from "../interfaces/CustomMouseEvent";
import { MouseMoveEvent } from "../interfaces/MouseMoveEvent";
import { MousePressEvent } from "../interfaces/MousePressEvent";

export const mouseMoveHandler = (event: MouseMoveEvent) => {
  const { x, y } = event;
  robot.moveMouse(x, y);
};

export const mouseUpHandler = (event: MousePressEvent) => {
  const fixed = RobotjsMouseConverter.fixMouseFormat(event.button);
  robot.mouseToggle("up", fixed);
};

export const mouseDownHandler = (event: MousePressEvent) => {
  const fixed = RobotjsMouseConverter.fixMouseFormat(event.button);
  robot.mouseToggle("down", fixed);
};

export const handleMouseInput = (event: CustomMouseEvent) => {
  if (event.type === "mouse:move") mouseMoveHandler(event);
  else {
    if (event.down === true) mouseDownHandler(event);
    else mouseUpHandler(event);
  }
};
