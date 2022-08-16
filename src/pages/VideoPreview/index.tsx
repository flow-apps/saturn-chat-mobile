import React, { useState, useRef } from "react";
import Header from "../../components/Header";
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
  BufferingContainer,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "styled-components";
import { ResizeMode, AVPlaybackStatus, Video } from "expo-av"
// import Video, { OnLoadData } from "react-native-video";
import { millisToTime } from "../../utils/format";
import LoadingIndicator from "../../components/LoadingIndicator";
import { StatusBar } from "react-native";
import { MotiView } from "@motify/components";
import { HeaderButton } from "../../components/Header/styles";
import { LinkUtils } from "../../utils/link";

const VideoPreview: React.FC = () => {
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [hiddenAll, setHiddenAll] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus>()
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const videoRef = useRef<Video>(null);
  const route = useRoute();
  const routeParams = route.params as {
    name: string;
    url: string;
    poster: string;
  };

  const handleSetInitialData = (data: AVPlaybackStatus) => {
    if (!data.isLoaded) return;

    setStatus(data);
    setDuration(data.durationMillis);
    setCurrentPosition(data.positionMillis);
    // setBuffering(data.isBuffering);
  }

  const handleUpdateStatus = (newStatus: AVPlaybackStatus) => {
    if (!newStatus.isLoaded) return;

    setStatus(newStatus);
    // setBuffering(newStatus.isBuffering);
    setCurrentPosition(newStatus.positionMillis);
  };

  const handlePlayPause = async () => {
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    }
    else {
      await videoRef.current.playAsync();
    }

    setPlay(old => !old);
  }

  const handleSeek = async (value: number) => {
    await videoRef.current.setPositionAsync(value)
    setCurrentPosition(value);
  };

  const handleHiddenAll = () => {
    setHiddenAll((old) => !old);
  };

  const downloadFile = async () => {
    await linkUtils.openLink(routeParams.url);
  };

  return (
    <>
      {!hiddenAll && (
        <MotiView
          from={{
            translateY: -50,
          }}
          animate={{
            translateY: 0,
          }}
          transition={{
            duration: 350,
            type: "timing",
          }}
        >
          <Header title={routeParams.name}  bgColor="#000">
            <HeaderButton onPress={downloadFile}>
              <Feather name="download" size={25} color="#fff" />
            </HeaderButton>
          </Header>
          <StatusBar backgroundColor="#000" />
        </MotiView>
      )}
      <StatusBar animated hidden={hiddenAll} />
      <Container>
        <VideoPlayerWrapper onPress={handleHiddenAll}>
          {buffering && (
            <BufferingContainer>
              <LoadingIndicator />
            </BufferingContainer>
          )}
          <Video
            ref={videoRef}
            style={{ width: "100%", height: "100%" }}
            shouldPlay={play}
            isLooping={true}
            isMuted={muted}
            volume={1}
            source={{ uri: routeParams.url }}
            posterSource={{ uri: routeParams.poster }}
            resizeMode={ResizeMode.CONTAIN}
            onLoad={handleSetInitialData}
            onPlaybackStatusUpdate={handleUpdateStatus}
            progressUpdateIntervalMillis={1000}
          />
        </VideoPlayerWrapper>
        {!hiddenAll && (
          <PlayerControlsContainer>
            <PlayerButton onPress={handlePlayPause}>
              <PlayerIcon>
                <MaterialCommunityIcons
                  name={play ? "pause" : "play"}
                  color="#fff"
                  size={25}
                />
              </PlayerIcon>
            </PlayerButton>
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
                step={1000}
                thumbTintColor={colors.secondary}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.dark_gray}
                onSlidingComplete={handleSeek}
              />
              <PlayerPositionContainer>
                <PlayerPosition>{millisToTime(duration)}</PlayerPosition>
              </PlayerPositionContainer>
            </PlayerSeekContainer>
            <PlayerButton onPress={() => setMuted((old) => !old)}>
              <PlayerIcon>
                <MaterialCommunityIcons
                  name={muted ? "volume-mute" : "volume-high"}
                  color="#fff"
                  size={22}
                />
              </PlayerIcon>
            </PlayerButton>
          </PlayerControlsContainer>
        )}
      </Container>
    </>
  );
};

export default VideoPreview;
