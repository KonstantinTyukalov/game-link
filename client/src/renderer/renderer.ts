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

const video = document.querySelector("video");

bridge.ipcRenderer.on(
  "stream:offer",
  (e: unknown, description: RTCSessionDescription) => {
    console.log(description);

    peerConnection = new RTCPeerConnection(configuration);
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        const { sdp, type } = peerConnection.localDescription;
        bridge.ipcRenderer.send("stream:answer", { sdp, type });
      });

    peerConnection.ontrack = (event) => {
      video.srcObject = event.streams[0];
      video.onloadedmetadata = () => video.play();
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        bridge.ipcRenderer.send("stream:candidate", event.candidate);
      }
    };
  }
);

bridge.ipcRenderer.on(
  "stream:candidate",
  (e: unknown, candidate: RTCIceCandidateInit) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
);
