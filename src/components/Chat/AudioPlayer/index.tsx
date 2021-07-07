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
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../utils/format";
import { useNavigation } from "@react-navigation/native";
import { AudioData } from "../../../../@types/interfaces";

interface IAudioPlayer {
  audio: AudioData;
}

const AudioPlayer = ({ audio }: IAudioPlayer) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      if (!sound || sound._loaded) {
        return await loadAudio();
      }
    })();
  }, []);

  const loadAudio = useCallback(async () => {
    if (sound && sound._loaded) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: false,
      staysActiveInBackground: false,
    });

    const newSound = await Audio.Sound.createAsync({ uri: audio.url });

    if (newSound.status.isLoaded) {
      newSound.sound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          return await handleFinish();
        } else {
          setCurrentPosition(status.positionMillis);
        }
      });
      setSound(newSound.sound);
    }

    navigation.addListener("blur", async () => {
      if (newSound.sound._loaded) {
        await newSound.sound.pauseAsync();
      }
    });
  }, [audio.url]);

  async function handleFinish() {
    await sound?.unloadAsync();
    setIsPlaying(false);
    onChangePosition(0);
  }

  const handlePlayPauseAudio = async () => {
    if (!sound) return;
    if (!sound._loaded) {
      await loadAudio();
    }

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playFromPositionAsync(currentPosition);
    }

    setIsPlaying(!isPlaying);
  };

  const onChangePosition = async (value: number) => {
    setCurrentPosition(value);
    await sound?.setPositionAsync(value);
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
              step={200}
              minimumValue={0}
              maximumValue={audio.duration}
              value={currentPosition}
              thumbTintColor={colors.secondary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dark_gray}
              onValueChange={onChangePosition}
            />
          </SeekBarContainer>
          <AudioDurationContainer>
            {!sound?._loaded ? (
              <LottieView
                style={{ width: 20, transform: [{ scale: 1.3 }] }}
                source={require("../../../assets/loading.json")}
                autoPlay
                loop
              />
            ) : (
              <AudioDuration>
                {isPlaying
                  ? millisToTime(currentPosition)
                  : millisToTime(audio.duration)}
              </AudioDuration>
            )}
          </AudioDurationContainer>
        </AudioControllerContainer>
      </AudioContainerWrapper>
    </Container>
  );
};

export default React.memo(AudioPlayer, (prev, next) => {
  return prev.audio.url !== next.audio.url;
});
