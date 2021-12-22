import React, { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
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
import { useNavigation } from "@react-navigation/native";
import { millisToTime } from "../../../../utils/format";
import { MotiView } from "moti";

interface AudioPreviewProps {
  audio: {
    name: string;
    url: string;
  };
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ audio }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const { colors } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    loadAudio();
  }, []);

  useEffect(() => {
    (async () => {
      if (sound) {
        if (isPlaying) await sound.pauseAsync();
        await sound.unloadAsync();
      }
    })();
  }, []);

  const loadAudio = useCallback(async () => {
    if (sound) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });

    const newSound = await Audio.Sound.createAsync({ uri: audio.url });

    if (newSound.status.isLoaded) {
      setSound(newSound.sound);
      newSound.sound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded) return;

        setDuration(Number(status?.durationMillis));

        if (status.didJustFinish) {
          await newSound.sound?.pauseAsync();
          return await handleFinish();
        } else {
          setCurrentPosition(status.positionMillis);
        }
      });
    }

    navigation.addListener("blur", async () => {
      if (newSound.sound._loaded) {
        await newSound.sound.pauseAsync();
        await newSound.sound.unloadAsync();
      }
    });
  }, []);

  async function handleFinish() {
    setIsPlaying(false);
    onChangePosition(0);
  }

  const handlePlayPauseAudio = async () => {
    if (!sound) {
      await loadAudio();
    }

    if (sound) {
      if (isPlaying) {
        await sound?.pauseAsync();
      } else {
        await sound?.playFromPositionAsync(currentPosition);
      }

      setIsPlaying(!isPlaying);
    }
  };

  const onChangePosition = async (value: number) => {
    setCurrentPosition(value);
    await sound?.setPositionAsync(value);
  };

  return (
    <MotiView
      from={{
        opacity: 0.3,
        marginTop: -50
      }}
      animate={{
        opacity: 1,
        marginTop: 0
      }}
      transition={{
        type: "timing",
        duration: 800,
      }}
    >
      <Container>
        <AudioPreviewContainer>
          <AudioPreviewControllersWrapper>
            <AudioPreviewButton onPress={handlePlayPauseAudio}>
              <MaterialIcons
                name={isPlaying ? "pause" : "play-arrow"}
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
                {isPlaying
                  ? millisToTime(currentPosition)
                  : millisToTime(duration)}
              </AudioPreviewDuration>
            </AudioPreviewDurationContainer>
          </AudioPreviewControllersWrapper>
        </AudioPreviewContainer>
      </Container>
    </MotiView>
  );
};

export default React.memo(AudioPreview, (prev, next) => {
  return prev.audio.url !== next.audio.url;
});
