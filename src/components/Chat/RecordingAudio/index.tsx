import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { millisToTime } from "../../../utils/format";
import {
  RecordingAudioContainer,
  RecordingAudioWrapper,
  RecordingAudioText,
  RecordingAudioDuration,
} from "./styles";
import { useTheme } from "styled-components";
import { useTranslate } from "../../../hooks/useTranslate";

interface RecordingAudioProps {
  audioDuration: number;
}

const RecordingAudio = ({ audioDuration }: RecordingAudioProps) => {
  const { colors } = useTheme();
  const { t } = useTranslate("Components.Chat.RecordingAudio");

  return (
    <RecordingAudioContainer>
      <RecordingAudioWrapper>
        <RecordingAudioText>
          <Feather name="mic" size={20} color={colors.red} /> {t("recording")}
        </RecordingAudioText>
      </RecordingAudioWrapper>
      <RecordingAudioDuration>
        {millisToTime(audioDuration)}
      </RecordingAudioDuration>
    </RecordingAudioContainer>
  );
};

export default RecordingAudio;
