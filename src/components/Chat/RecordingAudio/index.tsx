import React from "react";
import { Feather } from "@expo/vector-icons";
import { millisToTime } from "../../../utils/format";
import {
  RecordingAudioContainer,
  RecordingAudioWrapper,
  RecordingAudioText,
  RecordingAudioDuration,
} from "./styles";
import { useTheme } from "styled-components";
import { MotiView } from "moti";

interface RecordingAudioProps {
  audioDuration: number;
}

const RecordingAudio = ({ audioDuration }: RecordingAudioProps) => {
  const { colors } = useTheme();

  return (
    <RecordingAudioContainer>
      <MotiView
        from={{
          opacity: 1,
        }}
        animate={{
          opacity: 0.1,
        }}
        transition={{
          type: "timing",
          duration: 800,
        }}
      >
        <RecordingAudioWrapper>
          <RecordingAudioText>
            <Feather name="mic" size={20} color={colors.red} /> Gravando
          </RecordingAudioText>
        </RecordingAudioWrapper>
      </MotiView>
      <RecordingAudioDuration>
        {millisToTime(audioDuration)}
      </RecordingAudioDuration>
    </RecordingAudioContainer>
  );
};

export default RecordingAudio;
