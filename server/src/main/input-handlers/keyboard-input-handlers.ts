import robot from "robotjs";
import { CustomKeyboardEvent } from "../interfaces/CustomKeyboardEvent";
import { KeyboardKeyDownEvent } from "../interfaces/KeyboardKeyDownEvent";
import { KeyboardKeyUpEvent } from "../interfaces/KeyboardKeyUpEvent";

export const keyDownInputHandler = (event: KeyboardKeyDownEvent) => {
  robot.keyToggle(event.key, "down");
};

export const keyUpInputHandler = (event: KeyboardKeyUpEvent) => {
  robot.keyToggle(event.key, "up");
};

export const hadnleKeyboardEvent = (event: CustomKeyboardEvent) => {
  if (event.type === "keyboard:keyup") keyUpInputHandler(event);
  else keyDownInputHandler(event);
};
