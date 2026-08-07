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
import {
  AudioPlayer as AP,
  useAudioPlayer as expoAudioPlayer,
} from "expo-audio";
import { useAuth } from "@contexts/auth";

interface IAudioPlayer {
  audio: AudioData;
}

const AudioPlayer = ({ audio }: IAudioPlayer) => {
  const { currentAudioName, setCurrentAudioName } = useAudioPlayer();
  const { colors } = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const { getHeadersForAuthFiles } = useAuth();
  const sound = expoAudioPlayer(
    {
      uri: audio.url,
      headers: getHeadersForAuthFiles(audio.url),
    },
    1000,
  );


  useEffect(() => {
    if (sound) {
      setDuration(sound.duration);
      setCurrentPosition(sound.currentTime);
    }
  }, [sound]);

  useEffect(() => {
    (async () => {
      if (currentAudioName !== audio.name && isPlaying) {
        setIsPlaying(false);
        sound?.pause();
      }
    })();
  }, [currentAudioName]);

  const playAndPause = async () => {
    if (isPlaying) {
      setCurrentAudioName("");
      setIsPlaying(false);
      await sound?.pause;
    } else {
      setCurrentAudioName(audio.name);
      setIsPlaying(true);
      await sound?.seekTo(currentPosition);
    }
  };

  const seekAudio = async (newPos: number) => {
    setCurrentPosition(newPos);
    await sound?.seekTo(currentPosition);
    newPos;
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
