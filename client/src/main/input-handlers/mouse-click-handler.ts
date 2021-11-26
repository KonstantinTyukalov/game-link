export const mouseClickHandler = (event: MouseEvent): void => {
  const { button, buttons, detail } = event;

  const bridge = (window as any).bridge;
  bridge.ipcRenderer.send("mouseevent", { button, buttons, detail });

  console.log("button", button);
  console.log("detail", detail);
  console.log("buttons", buttons);
};
