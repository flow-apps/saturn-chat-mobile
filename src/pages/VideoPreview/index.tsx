import React, { useState, useRef, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Container,
  PlayerButton,
  PlayerControlsContainer,
  PlayerPosition,
  PlayerPositionContainer,
  PlayerIcon,
  PlayerSeek,
  PlayerSeekContainer,
  VideoPlayerWrapper,
  PlayerControls,
  PlayerButtonContainer,
  HeaderContainer,
  Header,
  HeaderButton,
  HeaderTitle,
} from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "styled-components";
import Video from "expo-av/build/Video";
import { millisToTime } from "@utils/format";
import { MotiView } from "moti";
import { AnimatePresence } from "moti";
import SystemNavigationBar from "react-native-system-navigation-bar";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { FileService } from "@services/file";
import { AVPlaybackStatus } from "expo-av/build/AV";
import { ResizeMode } from "expo-av/build/Video.types";
import { DateUtils } from "@utils/date";

const { convertToMillis } = new DateUtils();
const TIME_FOR_HIDE_CONTROLS = convertToMillis(3, "SECONDS");


const VideoPreview: React.FC = () => {
  const [play, setPlay] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hiddenControls, setHiddenControls] = useState(true);
  const [hiddenControlsTimeout, setHiddenControlsTimeout] =
    useState<NodeJS.Timeout>();
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const fileService = new FileService()
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as {
    name: string;
    original_name: string;
    url: string;
    poster: string;
  };

  const { colors } = useTheme();

  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
    return () => {
      SystemNavigationBar.navigationShow();
    };
  }, []);

  const handleSetInitialData = (data: AVPlaybackStatus) => {
    if (!data.isLoaded) return;

    setStatus(data);
    setDuration(data.durationMillis);
    setCurrentPosition(data.positionMillis);
  };

  const handleUpdateStatus = (newStatus: AVPlaybackStatus) => {
    if (!newStatus.isLoaded) return;

    setStatus(newStatus);
    setCurrentPosition(newStatus.positionMillis);
  };

  const handlePlayPause = async () => {
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }

    setPlay((old) => !old);
  };

  const handleSeek = async (value: number) => {
    await videoRef.current.setPositionAsync(value);
    setCurrentPosition(value);
  };

  const handleHiddenControls = () => {
    if (!hiddenControls) {
      setHiddenControls(true);
      return;
    }

    setHiddenControls(false);

    const timeout = setTimeout(async () => {
      setHiddenControls(true);
    }, TIME_FOR_HIDE_CONTROLS);
    clearTimeout(hiddenControlsTimeout);
    setHiddenControlsTimeout(timeout);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const downloadFile = async () => {
    await fileService.downloadFile(routeParams.url, routeParams.original_name)
  };

  return (
    <>
      <Container>
        <AnimatePresence>
          {!hiddenControls && (
            <HeaderContainer
              from={{
                translateY: -50,
                opacity: 0
              }}
              animate={{
                translateY: 0,
                opacity: 1
              }}
              exit={{
                translateY: -50,
                opacity: 0
              }}
              transition={{
                duration: 350,
                type: "timing",
              }}
            >
              <Header>
                <HeaderButton onPress={handleGoBack}>
                  <Feather name="x" color="#fff" size={28} />
                </HeaderButton>
                <HeaderTitle numberOfLines={1} ellipsizeMode="middle">
                  {routeParams.original_name}
                </HeaderTitle>
                <HeaderButton onPress={downloadFile}>
                  <Feather name="download" color="#fff" size={28} />
                </HeaderButton>
              </Header>
            </HeaderContainer>
          )}
        </AnimatePresence>
        <VideoPlayerWrapper>
          <Video
            ref={videoRef}
            style={{ width: "100%", height: "100%" }}
            shouldPlay={play}
            isLooping={true}
            volume={1}
            source={{ uri: routeParams.url }}
            posterSource={{ uri: routeParams.poster }}
            resizeMode={ResizeMode.CONTAIN}
            onLoad={handleSetInitialData}
            onPlaybackStatusUpdate={handleUpdateStatus}
            progressUpdateIntervalMillis={800}
          />
        </VideoPlayerWrapper>
        <PlayerControlsContainer onPress={handleHiddenControls}>
          <AnimatePresence>
            {!hiddenControls && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                }}
                transition={{
                  type: "timing",
                  duration: 200,
                }}
              >
                <PlayerButtonContainer>
                  <PlayerButton onPress={handlePlayPause}>
                    <PlayerIcon>
                      <MaterialCommunityIcons
                        name={play ? "pause" : "play"}
                        color="#fff"
                        size={25}
                      />
                    </PlayerIcon>
                  </PlayerButton>
                </PlayerButtonContainer>
                <PlayerControls>
                  <PlayerSeekContainer>
                    <PlayerPositionContainer>
                      <PlayerPosition>
                        {millisToTime(currentPosition)}
                      </PlayerPosition>
                    </PlayerPositionContainer>
                    <PlayerSeek
                      minimumValue={0}
                      maximumValue={duration}
                      value={currentPosition}
                      step={50}
                      thumbTintColor={colors.secondary}
                      minimumTrackTintColor={colors.secondary}
                      maximumTrackTintColor={colors.dark_gray}
                      onSlidingComplete={handleSeek}
                    />
                    <PlayerPositionContainer>
                      <PlayerPosition>{millisToTime(duration)}</PlayerPosition>
                    </PlayerPositionContainer>
                  </PlayerSeekContainer>
                </PlayerControls>
              </MotiView>
            )}
          </AnimatePresence>
        </PlayerControlsContainer>
      </Container>
    </>
  );
};

export default VideoPreview;
