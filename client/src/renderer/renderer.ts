import { subscribeToMouseEvents } from "../main/subscribers/mouse-events";
import { subscribeToKeyboardEvents } from "../main/subscribers/keyboard-events";

declare const window: { bridge: any };

const bridge = window.bridge;

subscribeToMouseEvents(document);

subscribeToKeyboardEvents(document);

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

let peerConnection: RTCPeerConnection;

bridge.ipcRenderer.on(
  "stream:offer",
  (e: unknown, description: RTCSessionDescription) => {
    peerConnection = new RTCPeerConnection(configuration);
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        bridge.ipcRenderer.emit(
          "stream:answer",
          peerConnection.localDescription
        );
      });

    peerConnection.ontrack = (event) => {
      const video = document.querySelector("video");
      video.srcObject = event.streams[0];
    };

    // peerConnection.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     socket.emit("candidate", id, event.candidate);
    //   }
    // };
  }
);
