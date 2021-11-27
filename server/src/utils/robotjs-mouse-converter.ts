export class RobotjsMouseConverter {
  static fixMouseButtonsFormat(button: number) {
    if (button === 0) return "left";
    if (button === 1) return "right";
    if (button === 2) return "middle";
  }

  static fixMouseFormat(button: number) {
    return this.fixMouseButtonsFormat(button);
  }
}
