export const mouseMoveHandler = (event: MouseEvent): void => {
  const bridge = (window as any).bridge;

  const { clientX, clientY } = event;
  console.log("x", clientX, "y", clientY);
  bridge.ipcRenderer.send("mouseevent", { clientX, clientY });
};
