import { createAudioPlayer } from "expo-audio";

const playJoinSound = async () => {
  try {
    const player = createAudioPlayer(require("@assets/call-on.mp3"));
    player.play();
  } catch (error) {
    console.error("[CallSound] Erro ao reproduzir som de entrada:", error);
  }
};

const playLeaveSound = async () => {
  try {
    const player = createAudioPlayer(require("@assets/call-off.mp3"));
    player.play();
  } catch (error) {
    console.error("[CallSound] Erro ao reproduzir som de saída:", error);
  }
};

export const callSounds = {
  playJoin: playJoinSound,
  playLeave: playLeaveSound,
};
