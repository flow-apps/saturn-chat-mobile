import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioPlayerContextProps {
  loadAudio: (data: LoadAudioData) => Promise<void>;
  playAndPauseAudio: (name: string, position: number) => void;
  currentAudioName: string;
  currentAudioData: AVPlaybackStatus;
}

interface SoundData {
  name: string;
  url: string;
  isPlaying: boolean;
  controller: Audio.Sound;
  data: AVPlaybackStatus;
}

interface LoadAudioData {
  name: string;
  url: string;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps>(
  {} as AudioPlayerContextProps
);

const AudioPlayerProvider: React.FC = ({ children }) => {
  const [sounds, setSounds] = useState<SoundData[]>([]);
  const [currentAudioName, setCurrentAudioName] = useState("");
  const [currentAudioData, setCurrentAudioData] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );

  useEffect(() => {
    Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    });
  }, []);

  const loadAudio = async ({ name, url }: LoadAudioData) => {
    const hasSound = sounds.filter((sound) => sound.name === name);

    if (hasSound.length) return;

    const audio = await Audio.Sound.createAsync({ uri: url });
    setSounds((old) => [
      ...old,
      {
        name,
        url,
        isPlaying: false,
        controller: audio.sound,
        data: audio.status,
      },
    ]);
  };

  const playAndPauseAudio = async (name: string, position?: number) => {
    let soundsForSave: SoundData[] = [];
    const sound = sounds.filter((s) => s.name === name).shift();
    soundsForSave = sounds.filter((s) => s.name !== name);

    if (!sound) return;

    if (currentAudioName) {
      soundsForSave = await Promise.all(
        soundsForSave.map(async (s) => {
          if (s.isPlaying) {
            await s.controller.pauseAsync();
            s.isPlaying = false;
          }

          return s;
        })
      );
    }

    setCurrentAudioData(sound.data);
    setCurrentAudioName(name);

    if (!sound.isPlaying) {
      await sound?.controller.playFromPositionAsync(position || 0);
      sound.isPlaying = true;
    } else {
      await sound.controller.pauseAsync();
      sound.isPlaying = false;
      setCurrentAudioName("");
    }
    setSounds([...soundsForSave, sound]);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        loadAudio,
        playAndPauseAudio,
        currentAudioName,
        currentAudioData,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

const useAudioPlayer = () => useContext(AudioPlayerContext);

export { AudioPlayerProvider, useAudioPlayer };
