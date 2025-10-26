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
import { millisToTime } from "@utils/format";
import { AudioData } from "@type/interfaces";
import { useAudioPlayer } from "@contexts/audioPlayer";
import { AudioPlayer as AP, useAudioPlayer as expoAudioPlayer } from "expo-audio";

interface IAudioPlayer {
  audio: AudioData;
}

const AudioPlayer = ({ audio }: IAudioPlayer) => {
  const { colors } = useTheme();
  const { currentAudioName, setCurrentAudioName } = useAudioPlayer();

  const [sound, setSound] = useState<AP>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    (async () => {
      const newSound = expoAudioPlayer({ uri: audio.url });

      setSound(newSound);
    })();
  }, [audio]);

  useEffect(() => {
    if (sound) {
      sound.addListener("playbackStatusUpdate", async (status) => {
        if (status.isLoaded) {
          if (!duration) 
            setDuration(sound.duration);

          setCurrentPosition(status.currentTime);    

          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentPosition(0);

            if (sound) {
              sound.pause();
              await sound.seekTo(0);
            };
          }
        }
      });
    }

    return () => {
      if (sound && sound.isLoaded) {
        sound.release();
      }
    };
  }, [sound, audio]);

  useEffect(() => {
    (async () => {
      if (currentAudioName !== audio.name && isPlaying) {
        setIsPlaying(false)
        sound.pause()
      }
    })()
  }, [currentAudioName])

  const playAndPause = async () => {
    if (isPlaying) {
      setCurrentAudioName("")
      setIsPlaying(false)
      sound.pause();
    } else {
      setCurrentAudioName(audio.name)
      setIsPlaying(true)
      sound.play();
    }

  };

  const seekAudio = async (newPos: number) => {
    setCurrentPosition(newPos);
    await sound.seekTo(newPos);
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
