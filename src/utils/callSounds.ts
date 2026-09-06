import { createAudioPlayer, AudioPlayer } from "expo-audio";

let joinPlayer: AudioPlayer | null = null;
let leavePlayer: AudioPlayer | null = null;

export const initCallSounds = () => {
  try {
    if (!joinPlayer) {
      joinPlayer = createAudioPlayer(require("@assets/call-on.mp3"));
    }
    if (!leavePlayer) {
      leavePlayer = createAudioPlayer(require("@assets/call-off.mp3"));
    }
  } catch (e) {
    console.error("Erro ao inicializar players de som:", e);
  }
};

const playJoinSound = async () => {
  try {
    if (!joinPlayer) initCallSounds();
    joinPlayer?.seekTo(0);
    joinPlayer?.play();
  } catch (error) {
    console.error("[CallSound] Erro som entrada:", error);
  }
};

const playLeaveSound = async () => {
  try {
    if (!leavePlayer) initCallSounds();
    leavePlayer?.seekTo(0);
    leavePlayer?.play();
  } catch (error) {
    console.error("[CallSound] Erro som saída:", error);
  }
};

export const callSounds = {
  playJoin: playJoinSound,
  playLeave: playLeaveSound,
};
