import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import RecordingAudio from "@components/Chat/RecordingAudio";
import {
  AudioRecordingContainer,
  CancelAudioButton,
  SendAudioButton,
} from "./styles";

interface AudioRecordingBarProps {
  audioDuration: number;
  onCancel: () => void;
  onSend: () => void;
}

export const AudioRecordingBar: React.FC<AudioRecordingBarProps> = ({
  audioDuration,
  onCancel,
  onSend,
}) => {
  const { colors } = useTheme();

  return (
    <AudioRecordingContainer>
      <CancelAudioButton onPress={onCancel}>
        <Feather name="trash-2" size={22} color={colors.red || "#FF5252"} />
      </CancelAudioButton>

      <RecordingAudio audioDuration={audioDuration} />

      <SendAudioButton onPress={onSend}>
        <Feather name="send" size={22} color="#FFF" />
      </SendAudioButton>
    </AudioRecordingContainer>
  );
};