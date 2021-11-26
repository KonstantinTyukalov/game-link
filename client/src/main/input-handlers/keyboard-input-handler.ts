export const keyboardInputHandler = (event: KeyboardEvent): void => {
  const { type, key } = event;

  const bridge = (window as any).bridge;
  bridge.ipcRenderer.send("keyboardevent", { type, key });

  console.log("type", type);
  console.log("key", key);
};
