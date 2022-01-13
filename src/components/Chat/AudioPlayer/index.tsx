import React, { useState, useEffect, useCallback } from "react";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
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
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../utils/format";
import { useNavigation } from "@react-navigation/native";
import { AudioData } from "../../../../@types/interfaces";
import { useAudioPlayer } from "../../../contexts/audioPlayer";

interface IAudioPlayer {
  audio: AudioData;
  deleted: Boolean;
}

const AudioPlayer = ({ audio, deleted }: IAudioPlayer) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const { loadAudio, playAndPauseAudio, currentAudioName } = useAudioPlayer();

  const { colors } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    loadAudio({ name: audio.name, url: audio.url });
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (sound) {
  //       if (isPlaying) {
  //         await sound.pauseAsync();
  //         setIsPlaying(false);
  //       }
  //       await sound.unloadAsync();
  //     }
  //   })();
  // }, [deleted]);

  // const loadAudio = useCallback(async () => {
  //   if (sound) return;

  //   const newSound = await Audio.Sound.createAsync({ uri: audio.url });

  //   if (newSound.status.isLoaded) {
  //     setSound(newSound.sound);
  //     newSound.sound.setOnPlaybackStatusUpdate(async (status) => {
  //       if (!status.isLoaded) return;

  //       if (status.didJustFinish) {
  //         await newSound.sound?.pauseAsync();
  //         return await handleFinish();
  //       } else {
  //         setCurrentPosition(status.positionMillis);
  //       }
  //     });
  //   }

  //   navigation.addListener("blur", async () => {
  //     if (newSound.sound._loaded) {
  //       await newSound.sound.pauseAsync();
  //       await newSound.sound.unloadAsync();
  //       setIsPlaying(false)
  //     }
  //   });
  // }, []);

  async function handleFinish() {
    setIsPlaying(false);
    onChangePosition(0);
  }

  const handlePlayPauseAudio = async () => {
    await playAndPauseAudio(audio.name, currentPosition);
  };

  const onChangePosition = async (value: number) => {
    setCurrentPosition(value);
    // await sound?.setPositionAsync(value);
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
