import React, { createContext, useContext, useEffect, useState } from "react";

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

interface AudioPlayerContextProps {
  Audio: typeof Audio;
  currentAudioName: string;
  setCurrentAudioName: React.Dispatch<React.SetStateAction<string>>;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps>(
  {} as AudioPlayerContextProps
);

const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAudioName, setCurrentAudioName] = useState("");

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        Audio,
        currentAudioName,
        setCurrentAudioName,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

const useAudioPlayer = () => useContext(AudioPlayerContext);

export { AudioPlayerProvider, useAudioPlayer };
