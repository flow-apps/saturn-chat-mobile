import React, { createContext, useContext, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioPlayerContextProps {
  loadAudio: (data: LoadAudioData) => Promise<void>;
}

interface SoundData {
  name: string;
  url: string;
  isPlaying: boolean;
  controller: Audio.Sound;
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
      },
    ]);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        loadAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

const useAudioPlayer = () => useContext(AudioPlayerContext);

export { AudioPlayerProvider, useAudioPlayer };
