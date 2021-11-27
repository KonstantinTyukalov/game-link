export interface MousePressEvent {
  readonly type: "mouse:press";
  readonly button: number;
  readonly down: boolean;
}
