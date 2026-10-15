/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards
TAG: MCP.RTC.NATIVE.SDK
REGION: 🟣 MCP

5WH:
WHAT = Wraps native WebRTC peer connections and media capture
WHY = Keeps native RTC transport in a bounded adapter
WHO = LeeWay-Standards (existing AUTHORITY declaration)
WHERE = src/runtime/rtc/leeway-rtc-native.ts
WHEN = 2026-10-15 (governance review)
HOW = Existing source implementation below this header, unmodified
LICENSE: Existing file and repository license terms remain unchanged
*/
// CHAIN: Standards → Integrated → Runtime → Projections


import { mediaDevices, RTCPeerConnection } from 'react-native-webrtc';

export class LeewayRTCNative {
  pc: RTCPeerConnection;
  stream: any;

  constructor(iceServers: any[]) {
    this.pc = new RTCPeerConnection({ iceServers });
  }

  async startAudio() {
    this.stream = await mediaDevices.getUserMedia({ audio: true });

    this.stream.getTracks().forEach(track => {
      this.pc.addTrack(track, this.stream);
    });
  }

  onRemoteStream(cb: (stream: any) => void) {
    this.pc.ontrack = (e) => cb(e.streams[0]);
  }
}
