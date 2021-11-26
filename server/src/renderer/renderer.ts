import "./index.css";

interface DesktopCapturer {
  getEntireScreenSource(): Promise<DesktopCapturerSource>;
}

interface DesktopCapturerSource {
  readonly id: string;
}

interface IpcRenderer {
  send(channel: string, ...args: unknown[]): void;
  on(channel: string, listener: unknown): void;
}

declare const window: {
  bridge: {
    desktopCapturer: DesktopCapturer;
    ipcRenderer: IpcRenderer;
  };
};

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

let peerConnection: RTCPeerConnection;
let mediaStream: MediaStream;

const { desktopCapturer, ipcRenderer } = window.bridge;

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

  mediaStream = await navigator.mediaDevices.getUserMedia(
    constraints as MediaStreamConstraints
  );
});

ipcRenderer.on("stream:connection", () => {
  peerConnection = new RTCPeerConnection(configuration);

  console.log(peerConnection);
  console.log(mediaStream);

  peerConnection.onicecandidate = (e) => {
    if (e.candidate) {
      ipcRenderer.send("stream:candidate", e.candidate);
    }
  };

  mediaStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, mediaStream));

  peerConnection
    .createOffer()
    .then((sdp) => peerConnection.setLocalDescription(sdp))
    .then(() => {
      ipcRenderer.send("stream:offer", peerConnection.localDescription);
    });
});

ipcRenderer.on(
  "stream:candidate",
  (e: unknown, candidate: RTCIceCandidateInit) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
);

ipcRenderer.on(
  "stream:answer",
  (e: unknown, description: RTCSessionDescription) => {
    peerConnection.setRemoteDescription(description);
  }
);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
