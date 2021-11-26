import "./index.css";

interface DesktopCapturer {
  getEntireScreenSource(): Promise<DesktopCapturerSource>;
}

interface DesktopCapturerSource {
  readonly id: string;
}

declare const window: {
  bridge: {
    desktopCapturer: DesktopCapturer;
  };
};

const { desktopCapturer } = window.bridge;

desktopCapturer.getEntireScreenSource().then(async (source) => {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };

  const stream = await navigator.mediaDevices.getUserMedia(
    constraints as MediaStreamConstraints
  );

  const video = document.querySelector("video");
  video.srcObject = stream;
  video.onloadedmetadata = () => video.play();
});

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
