export const keyboardInputHandler = (event: KeyboardEvent): void => {
  const { type, key } = event;

  const bridge = (window as any).bridge;
  bridge.ipcRenderer.send("keyboardevent", { type, key });

  console.log("event at keyboard input", { type, key });
};
