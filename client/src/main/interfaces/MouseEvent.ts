import { MouseClickEvent } from "./MouseClickEvent";
import { MouseMoveEvent } from "./MouseMoveEvent";
import { MousePressEvent } from "./MousePressEvent";

export type CustomMouseEvent =
  | MouseMoveEvent
  | MousePressEvent
  | MouseClickEvent;
