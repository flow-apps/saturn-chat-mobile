import React, { useState } from "react";
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
import  MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../utils/format";
import { useFocusEffect  } from "@react-navigation/native";
import { AudioData } from "../../../../@types/interfaces";
import { useAudioPlayer } from "../../../contexts/audioPlayer";

interface IAudioPlayer {
  audio: AudioData;
  deleted: Boolean;
}

const AudioPlayer = ({ audio, deleted }: IAudioPlayer) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const {
    loadAudio,
    playAndPauseAudio,
    changeAudioPosition,
    currentAudioName,
  } = useAudioPlayer();

  const { colors } = useTheme();

  useFocusEffect(() => {
    loadAudio({
      name: audio.name,
      url: audio.url,
      onStatusUpdate: async (status) => {
        if (!status.isLoaded) return;

        if (status.isPlaying) {
          setCurrentPosition(status?.positionMillis);
        }
        
      },
      onFinishAudio: async () => {
        setCurrentPosition(0);        
      },
    });
  });

  const handlePlayPauseAudio = async () => {
    await playAndPauseAudio(audio.name, currentPosition);
  };

  const onChangePosition = async (value: number) => {
    await changeAudioPosition(audio.name, value);
    setCurrentPosition(value);
  };

  return (
    <Container>
      <AudioContainerWrapper>
        <AudioControllerContainer>
          <AudioController onPress={handlePlayPauseAudio}>
            {currentAudioName === audio.name ? (
              <MaterialIcons name="pause" size={30} color={colors.black} />
            ) : (
              <MaterialIcons name="play-arrow" size={30} color={colors.black} />
            )}
          </AudioController>
          <SeekBarContainer>
            <SeekBar
              minimumValue={0}
              maximumValue={audio.duration}
              value={currentPosition}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dark_gray}
              onSlidingComplete={onChangePosition}
            />
          </SeekBarContainer>
          <AudioDurationContainer>
            <AudioDuration>
              {currentAudioName === audio.name
                ? millisToTime(currentPosition)
                : millisToTime(audio.duration)}
            </AudioDuration>
          </AudioDurationContainer>
        </AudioControllerContainer>
      </AudioContainerWrapper>
    </Container>
  );
};

export default React.memo(AudioPlayer, (prev, next) => {
  return prev.audio.url !== next.audio.url && prev.deleted !== next.deleted;
});
