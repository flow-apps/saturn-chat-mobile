import React, { useEffect, useState } from "react";
import {
  Container,
  AudioContainerWrapper,
  AudioControllerContainer,
  AudioController,
  SeekBarContainer,
  SeekBar,
  AudioDurationContainer,
  AudioDuration,
} from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../utils/format";
import { AudioData } from "../../../../@types/interfaces";
import { useAudioPlayer } from "../../../contexts/audioPlayer";
import { SoundObject } from "expo-av/build/Audio";

interface IAudioPlayer {
  audio: AudioData;
}

const AudioPlayer = ({ audio }: IAudioPlayer) => {
  const { Audio, currentAudioName, setCurrentAudioName } = useAudioPlayer();
  const { colors } = useTheme();

  const [sound, setSound] = useState<SoundObject>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    (async () => {
      const newSound = await Audio.Sound.createAsync({ uri: audio.url });

      setSound(newSound);
    })();
  }, [audio]);

  useEffect(() => {
    if (sound) {
      sound.sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          if (!duration) 
            setDuration(status.durationMillis);

          setCurrentPosition(status.positionMillis);    

          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentPosition(0);

            if (sound) {
              await sound.sound.pauseAsync()
              await sound.sound.setPositionAsync(0)
            };
          }
        }
      });
    }

    return () => {
      if (sound && sound.status.isLoaded) {
        sound.sound.unloadAsync();
      }
    };
  }, [sound, audio]);

  useEffect(() => {
    (async () => {
      if (currentAudioName !== audio.name && isPlaying) {
        setIsPlaying(false)
        await sound.sound.pauseAsync()
      }
    })()
  }, [currentAudioName])

  const playAndPause = async () => {
    if (isPlaying) {
      setCurrentAudioName("")
      setIsPlaying(false)
      await sound.sound.pauseAsync();
    } else {
      setCurrentAudioName(audio.name)
      setIsPlaying(true)
      await sound.sound.playFromPositionAsync(currentPosition);
    }

  };

  const seekAudio = async (newPos: number) => {
    setCurrentPosition(newPos);
    await sound.sound.setPositionAsync(newPos);
  };

  return (
    <Container>
      <AudioContainerWrapper>
        <AudioControllerContainer>
          <AudioController onPress={playAndPause}>
            {isPlaying ? (
              <MaterialIcons name="pause" size={30} color={colors.black} />
            ) : (
              <MaterialIcons name="play-arrow" size={30} color={colors.black} />
            )}
          </AudioController>
          <SeekBarContainer>
            <SeekBar
              step={1}
              minimumValue={0}
              maximumValue={duration}
              value={currentPosition}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dark_gray}
              onSlidingComplete={seekAudio}
            />
          </SeekBarContainer>
          <AudioDurationContainer>
            <AudioDuration>
              {isPlaying || currentPosition > 0
                ? millisToTime(currentPosition)
                : millisToTime(duration)}
            </AudioDuration>
          </AudioDurationContainer>
        </AudioControllerContainer>
      </AudioContainerWrapper>
    </Container>
  );
};

export default React.memo(AudioPlayer);
