import React, { useState, useEffect } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
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

import avatar from "../../assets/avatar.jpg";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { millisToTime } from "../../utils/format";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

interface IAudioPlayer {
  url: string;
}

const AudioPlayer = ({ url }: IAudioPlayer) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    loadAudio();
  }, []);

  const loadAudio = useCallback(async () => {
    if (sound) return;
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: false,
    });

    const newSound = await Audio.Sound.createAsync({ uri: url });

    if (newSound.status.isLoaded) {
      const status = newSound.status;
      setDuration(Number(status.durationMillis));
      setSound(newSound.sound);

      newSound.sound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          return await handleFinish();
        } else {
          setIsPlaying(status.isPlaying);
          setCurrentPosition(status.positionMillis);
        }
      });
    }

    navigation.addListener("blur", async () => {
      if (newSound.sound._loaded) {
        await newSound.sound.pauseAsync();
      }
    });
  }, [url]);

  async function handleFinish() {
    setIsPlaying(false);
    onChangePosition(0);
    await sound?.unloadAsync();
  }

  const handlePlayPauseAudio = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playFromPositionAsync(currentPosition);
    }
    setIsPlaying(!isPlaying);
  };

  const onChangePosition = (value: number) => {
    setCurrentPosition(value);
    sound?.setPositionAsync(value);
  };

  return (
    <Container loading={!sound || sound?._loading}>
      <AudioContainerWrapper>
        <AudioControllerContainer>
          <AudioController onPress={handlePlayPauseAudio}>
            {isPlaying ? (
              <Feather name={"pause-circle"} size={30} color={colors.black} />
            ) : (
              <Feather name={"play-circle"} size={30} color={colors.black} />
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
              onValueChange={onChangePosition}
            />
          </SeekBarContainer>
          <AudioDurationContainer>
            <AudioDuration>
              {isPlaying
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
