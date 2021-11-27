export class RobotjsKeyboardConverter {
  static fixArrowsKeyFormat(key: string) {
    if (key === "ArrowUp") return "up";
    if (key === "ArrowDown") return "down";
    if (key === "ArrowRight") return "right";
    if (key === "ArrowLeft") return "left";
    return key;
  }

  static fixKeyFormat(key: string) {
    return this.fixArrowsKeyFormat(key.toLowerCase());
  }
}
