import React from "react";
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

const AudioPreview: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <AudioPreviewContainer>
        <AudioPreviewControllersWrapper>
          <AudioPreviewButton>
            <MaterialIcons name="play-arrow" size={28} color={colors.black} />
          </AudioPreviewButton>
          <AudioPreviewSeekContainer>
            <AudioPreviewSeek
              minimumValue={0}
              maximumValue={100}
              value={0}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dark_gray}
              // onSlidingComplete={onChangePosition}
            />
          </AudioPreviewSeekContainer>
          <AudioPreviewDurationContainer>
            <AudioPreviewDuration>00:00</AudioPreviewDuration>
          </AudioPreviewDurationContainer>
        </AudioPreviewControllersWrapper>
      </AudioPreviewContainer>
    </Container>
  );
};

export default AudioPreview;
