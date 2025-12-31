import React, { createContext, useContext, useEffect, useState } from "react";

import { setAudioModeAsync } from "expo-audio";

interface AudioPlayerContextProps {
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
    setAudioModeAsync({
      interruptionMode: "doNotMix",
      interruptionModeAndroid: "doNotMix",
      playsInSilentMode: true,
      shouldRouteThroughEarpiece: true
    })
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
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
