import robot from "robotjs";
import { RobotjsKeyboardConverter } from "../../utils/robotjs-keyboard-converter";
import { CustomKeyboardEvent } from "../interfaces/CustomKeyboardEvent";
import { KeyboardKeyDownEvent } from "../interfaces/KeyboardKeyDownEvent";
import { KeyboardKeyUpEvent } from "../interfaces/KeyboardKeyUpEvent";

export const keyDownInputHandler = (event: KeyboardKeyDownEvent) => {
  const fixedKey = RobotjsKeyboardConverter.fixKeyFormat(event.key);
  robot.keyToggle(fixedKey, "down");
};

export const keyUpInputHandler = (event: KeyboardKeyUpEvent) => {
  const fixedKey = RobotjsKeyboardConverter.fixKeyFormat(event.key);
  robot.keyToggle(fixedKey, "up");
};

export const hadnleKeyboardEvent = (event: CustomKeyboardEvent) => {
  if (event.type === "keyboard:keyup") keyUpInputHandler(event);
  else keyDownInputHandler(event);
};
