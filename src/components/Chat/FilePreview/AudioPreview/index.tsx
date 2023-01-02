import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
import { useFocusEffect } from "@react-navigation/native";

interface AudioPreviewProps {
  deleted: boolean;
  audio: {
    name: string;
    url: string;
  };
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ audio, deleted }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const {
    loadAudio,
    playAndPauseAudio,
    changeAudioPosition,
    currentAudioName,
  } = useAudioPlayer();

  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      loadAudio({
        name: audio.name,
        url: audio.url,
        onStatusUpdate: async (status) => {
          if (!status.isLoaded) return;

          if (duration === 0) {
            setDuration(Number(status?.durationMillis));
          }

          if (status.isPlaying) {
            setCurrentPosition(status?.positionMillis);
          }
        },
        onFinishAudio: async () => {
          setCurrentPosition(0);
        },
      });
    }, [audio])
  );

  const handlePlayPauseAudio = useCallback(async () => {
    await playAndPauseAudio(audio.name, currentPosition);
  }, [audio.name, currentAudioName, currentPosition]);

  const onChangePosition = async (value: number) => {
    await changeAudioPosition(audio.name, value);
    setCurrentPosition(value);
  };

  return (
    <Container>
      <AudioPreviewContainer>
        <AudioPreviewControllersWrapper>
          <AudioPreviewButton onPress={handlePlayPauseAudio}>
            <MaterialIcons
              name={currentAudioName === audio.name ? "pause" : "play-arrow"}
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
              onSlidingComplete={onChangePosition}
            />
          </AudioPreviewSeekContainer>
          <AudioPreviewDurationContainer>
            <AudioPreviewDuration>
              {currentAudioName === audio.name
                ? millisToTime(currentPosition)
                : millisToTime(duration)}
            </AudioPreviewDuration>
          </AudioPreviewDurationContainer>
        </AudioPreviewControllersWrapper>
      </AudioPreviewContainer>
    </Container>
  );
};

export default React.memo(AudioPreview, (prev, next) => {
  return prev.audio.url === next.audio.url;
});
