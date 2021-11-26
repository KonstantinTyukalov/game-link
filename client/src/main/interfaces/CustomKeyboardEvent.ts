import { KeyboardKeyDownEvent } from "./KeyboardKeyDownEvent";
import { KeyboardKeyUpEvent } from "./KeyboardKeyPress";
import { KeyboardKeyPressEvent } from "./KeyboardKeyPressEvent";

export type CustomKeyboardEvent =
  | KeyboardKeyPressEvent
  | KeyboardKeyDownEvent
  | KeyboardKeyUpEvent;
