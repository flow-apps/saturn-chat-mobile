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
  VideoPlayer,
  VideoPlayerWrapper,
  BufferingContainer,
} from "./styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Video, { OnLoadData } from "react-native-video";
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
  const [buffering, setBuffering] = useState(true);
  const [hiddenAll, setHiddenAll] = useState(false);
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const videoRef = useRef<Video>();
  const route = useRoute();
  const routeParams = route.params as {
    name: string;
    url: string;
    poster: string;
  };

  const handleSetData = (data: OnLoadData) => {
    setDuration(data.duration);
    setCurrentPosition(data.currentPosition);
    setBuffering(false);
  };

  const handleSeek = (value: number) => {
    setCurrentPosition(value);
    videoRef.current?.seek(value);
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
          <VideoPlayer
            ref={videoRef as any}
            source={{ uri: routeParams.url }}
            poster={routeParams.poster}
            paused={!play}
            muted={muted}
            onLoad={handleSetData}
            resizeMode="contain"
            fullscreenOrientation="landscape"
            fullscreen={hiddenAll}
            onProgress={(data) => setCurrentPosition(data.currentTime)}
            onBuffer={(data) => setBuffering(data.isBuffering)}
            onLoadStart={() => setBuffering(true)}
            currentTime={currentPosition}
            volume={1}
            onVideoBuffer={() => setBuffering((old) => !old)}
            repeat
          />
        </VideoPlayerWrapper>
        {!hiddenAll && (
          <PlayerControlsContainer>
            <PlayerButton onPress={() => setPlay((old) => !old)}>
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
                  {millisToTime(currentPosition * 1000)}
                </PlayerPosition>
              </PlayerPositionContainer>
              <PlayerSeek
                minimumValue={0}
                maximumValue={duration}
                value={currentPosition}
                step={1}
                thumbTintColor={colors.secondary}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.dark_gray}
                onSlidingComplete={handleSeek}
              />
              <PlayerPositionContainer>
                <PlayerPosition>{millisToTime(duration * 1000)}</PlayerPosition>
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
