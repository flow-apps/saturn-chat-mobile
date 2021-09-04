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

interface RecordingAudioProps {
  audioDuration: number;
}

const RecordingAudio = ({ audioDuration }: RecordingAudioProps) => {
  const { colors } = useTheme();

  return (
    <RecordingAudioContainer>
      <RecordingAudioWrapper>
        <RecordingAudioText>
          <Feather name="mic" size={20} color={colors.red} /> Gravando
        </RecordingAudioText>
      </RecordingAudioWrapper>
      <RecordingAudioDuration>
        {millisToTime(audioDuration)}
      </RecordingAudioDuration>
    </RecordingAudioContainer>
  );
};

export default RecordingAudio;
