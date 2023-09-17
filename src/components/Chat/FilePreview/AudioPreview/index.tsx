import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  AudioPreviewButton,
  AudioPreviewContainer,
  AudioPreviewControllersWrapper,
  AudioPreviewDuration,
  AudioPreviewDurationContainer,
  AudioPreviewSeek,
  AudioPreviewSeekContainer,
  Container,
} from "./styles";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../../utils/format";
import { useAudioPlayer } from "../../../../contexts/audioPlayer";
import { SoundObject } from "expo-av/build/Audio";

interface AudioPreviewProps {
  audio: {
    name: string;
    url: string;
  };
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ audio }) => {
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
          if (!duration) setDuration(status.durationMillis);

          setCurrentPosition(status.positionMillis);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentPosition(0);

            if (sound) {
              await sound.sound.pauseAsync();
              await sound.sound.setPositionAsync(0);
            }
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
        setIsPlaying(false);
        await sound.sound.pauseAsync();
      }
    })();
  }, [currentAudioName]);

  const playAndPause = async () => {
    if (isPlaying) {
      setCurrentAudioName("");
      setIsPlaying(false);
      await sound.sound.pauseAsync();
    } else {
      setCurrentAudioName(audio.name);
      setIsPlaying(true);
      await sound.sound.playFromPositionAsync(currentPosition);
    }
  };

  const seekAudio = async (newPos: number) => {
    setCurrentPosition(newPos);
    await sound.sound.setPositionAsync(newPos);
  };

  return (
    <Container>
      <AudioPreviewContainer>
        <AudioPreviewControllersWrapper>
          <AudioPreviewButton onPress={playAndPause}>
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={28}
              color={colors.black}
            />
          </AudioPreviewButton>
          <AudioPreviewSeekContainer>
            <AudioPreviewSeek
              minimumValue={0}
              maximumValue={duration}
              value={currentPosition}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dark_gray}
              onSlidingComplete={seekAudio}
            />
          </AudioPreviewSeekContainer>
          <AudioPreviewDurationContainer>
            <AudioPreviewDuration>
              {isPlaying || currentPosition > 0
                ? millisToTime(currentPosition)
                : millisToTime(duration)}
            </AudioPreviewDuration>
          </AudioPreviewDurationContainer>
        </AudioPreviewControllersWrapper>
      </AudioPreviewContainer>
    </Container>
  );
};

export default React.memo(AudioPreview);
