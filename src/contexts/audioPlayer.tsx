import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioPlayerContextProps {
  loadAudio: (data: LoadAudioData) => Promise<void>;
  unloadAllAudios: () => Promise<void>;
  playAndPauseAudio: (name: string, position?: number) => Promise<void>;
  changeAudioPosition: (name: string, position: number) => Promise<void>;
  currentAudioName: string;
  currentSound: SoundData | null;
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
  onStatusUpdate: (status: AVPlaybackStatus) => any;
  onFinishAudio: () => any;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps>(
  {} as AudioPlayerContextProps
);

const AudioPlayerProvider: React.FC = ({ children }) => {
  const [sounds, setSounds] = useState<SoundData[]>([]);
  const [currentAudioName, setCurrentAudioName] = useState("");
  const [currentSound, setCurrentSound] = useState<SoundData | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      allowsRecordingIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    });
  }, []);

  const loadAudio = async ({
    name,
    url,
    onStatusUpdate,
    onFinishAudio,
  }: LoadAudioData) => {
    const hasSound = sounds.some((sound) => sound.name === name);

    if (hasSound) return;

    const audio = await Audio.Sound.createAsync({ uri: url, name });

    audio.sound.setOnPlaybackStatusUpdate(async (status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {        
        await onFinishAudio();
        await changeAudioPosition(name, 0)
        await pauseAudio(name)

        setCurrentAudioName("")
        setCurrentSound(null)

        return;
      }

      return await onStatusUpdate(status);
    });

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

  const unloadAllAudios = async () => {
    Promise.all(sounds.map(async s => {
      if (!s) return;
  
      if (s.isPlaying) {
        await s.controller.pauseAsync();
      }
  
      if (s.name === currentAudioName) {
        setCurrentAudioName("");
        setCurrentSound(null);
      }
  
      s.controller._clearSubscriptions()
      await s.controller.unloadAsync();
    }))

    setSounds([]);
  };

  const playAudio = async (name: string, position = 0) => {
    let soundsForSave = sounds.filter((s) => s.name !== name);
    const sound = sounds.filter((s) => s.name === name).shift();

    if (!sound) return;

    if (currentAudioName !== sound.name) {
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

    setCurrentAudioName(sound.name);
    setCurrentSound(sound);
    await sound?.controller.playFromPositionAsync(position)
    sound.isPlaying = true;

    setSounds([...soundsForSave, sound]);
  }

  const pauseAudio = async (name: string) => {
    const sound = sounds.filter((s) => s.name === name).shift();
    const soundsForSave = sounds.filter((s) => s.name !== name);

    if (!sound) return;

    setCurrentAudioName("");
    setCurrentSound(null);
    await sound?.controller.pauseAsync()
    sound.isPlaying = false;

    setSounds([...soundsForSave, sound]);
  }

  const playAndPauseAudio = async (name: string, position = 0) => {
    if (currentAudioName === name) {
      await pauseAudio(name)
    } else {
      await playAudio(name, position)
    }
  };

  const changeAudioPosition = async (name: string, position: number) => {
    const sound = sounds.filter((s) => s.name === name).shift();

    if (!sound) return;

    await sound.controller.setPositionAsync(position);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        loadAudio,
        unloadAllAudios,
        playAndPauseAudio,
        changeAudioPosition,
        currentAudioName,
        currentSound,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

const useAudioPlayer = () => useContext(AudioPlayerContext);

export { AudioPlayerProvider, useAudioPlayer };
