import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { ActivityIndicator } from "react-native";
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
import { useTheme } from "styled-components/native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import { secondsToTime } from "@utils/format";
import { MotiView, AnimatePresence } from "moti";
import SystemNavigationBar from "react-native-system-navigation-bar";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { FileService } from "@services/file";
import { DateUtils } from "@utils/date";
import { useAuth } from "@contexts/auth";
import Alert from "@components/Alert";
import {
  isScreenshotBlocked,
  useScreenshotProtection,
} from "@hooks/useScreenshotProtection";
import { useTranslate } from "@hooks/useTranslate";

const { convertToMillis } = new DateUtils();
const TIME_FOR_HIDE_CONTROLS = convertToMillis(3, "SECONDS");

const VideoPreview: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(false);

  const [hiddenControls, setHiddenControls] = useState(false);
  const [hiddenControlsTimeout, setHiddenControlsTimeout] =
    useState<NodeJS.Timeout>();

  const fileService = new FileService();
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as {
    name: string;
    original_name: string;
    url: string;
    poster: string;
    antiPrint?: boolean;
    conversationType?: "GROUP" | "DIRECT";
  };

  const { getHeadersForAuthFiles } = useAuth();
  const { colors } = useTheme();
  const { t } = useTranslate("Settings");

  const screenshotBlocked = isScreenshotBlocked({
    antiPrint: routeParams.antiPrint === true,
    conversationType: routeParams.conversationType || "DIRECT",
    settingsLoading: false,
  });

  const { screenshotAlertVisible, dismissScreenshotAlert } =
    useScreenshotProtection(
      screenshotBlocked,
      false,
      `video-${routeParams.url}`,
    );

  const formattedVideoUrl = useMemo(() => {
    if (!routeParams.url) return "";
    return routeParams.url.includes("?")
      ? `${routeParams.url}&ext=.mp4`
      : `${routeParams.url}?ext=.mp4`;
  }, [routeParams.url]);

  const videoHeaders = useMemo(
    () => getHeadersForAuthFiles(routeParams.url),
    [getHeadersForAuthFiles, routeParams.url],
  );

  const videoPlayer = useVideoPlayer(
    {
      uri: formattedVideoUrl,
      headers: videoHeaders,
    },
    (player) => {
      player.loop = false;
      player.play();
    },
  );

  // Escuta nativa reativa do estado de reprodução e status do carregamento
  const { isPlaying } = useEvent(videoPlayer, "playingChange", {
    isPlaying: videoPlayer.playing,
  });

  const { status } = useEvent(videoPlayer, "statusChange", {
    status: videoPlayer.status,
  });

  // Identifica se o vídeo está em fase de carregamento/buffering
  const isLoading = status === "loading" || status === "idle";

  useEffect(() => {
    SystemNavigationBar.fullScreen(true);
    return () => {
      SystemNavigationBar.fullScreen(false);
    };
  }, []);

  useEffect(() => {
    isSeekingRef.current = isSeeking;
  }, [isSeeking]);

  useEffect(() => {
    const updateTime = () => {
      if (videoPlayer) {
        if (videoPlayer.duration && videoPlayer.duration > 0) {
          setDuration(videoPlayer.duration);
        }
        if (!isSeekingRef.current && videoPlayer.currentTime !== undefined) {
          setCurrentPosition(videoPlayer.currentTime);
        }
      }
    };

    const interval = setInterval(updateTime, 250);

    const timeSub = videoPlayer.addListener("timeUpdate", (payload) => {
      if (!isSeekingRef.current) {
        setCurrentPosition(payload.currentTime);
      }
    });

    const endSub = videoPlayer.addListener("playToEnd", () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      setCurrentPosition(0);
      setHiddenControls(false);
    });

    return () => {
      clearInterval(interval);
      timeSub.remove();
      endSub.remove();
    };
  }, [videoPlayer]);

  const resetControlsTimeout = useCallback(() => {
    if (hiddenControlsTimeout) {
      clearTimeout(hiddenControlsTimeout);
    }
    const timeout = setTimeout(() => {
      setHiddenControls(true);
    }, TIME_FOR_HIDE_CONTROLS);

    setHiddenControlsTimeout(timeout);
  }, [hiddenControlsTimeout]);

  const handlePlayPause = useCallback(() => {
    if (isLoading) return; // Evita ações caso esteja carregando

    resetControlsTimeout();

    if (videoPlayer.currentTime >= duration && duration > 0) {
      videoPlayer.currentTime = 0;
      setCurrentPosition(0);
      videoPlayer.play();
      return;
    }

    if (videoPlayer.playing) {
      videoPlayer.pause();
    } else {
      videoPlayer.play();
    }
  }, [videoPlayer, duration, isLoading, resetControlsTimeout]);

  const handleSlidingStart = useCallback(() => {
    setIsSeeking(true);
    isSeekingRef.current = true;
    if (hiddenControlsTimeout) {
      clearTimeout(hiddenControlsTimeout);
    }
  }, [hiddenControlsTimeout]);

  const handleValueChange = useCallback((value: number) => {
    setCurrentPosition(value);
  }, []);

  const handleSlidingComplete = useCallback(
    (value: number) => {
      videoPlayer.currentTime = value;
      setCurrentPosition(value);
      setIsSeeking(false);
      isSeekingRef.current = false;
      resetControlsTimeout();
    },
    [videoPlayer, resetControlsTimeout],
  );

  const handleHiddenControls = useCallback(() => {
    if (!hiddenControls) {
      setHiddenControls(true);
      return;
    }

    setHiddenControls(false);
    resetControlsTimeout();
  }, [hiddenControls, resetControlsTimeout]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const downloadFile = useCallback(async () => {
    await fileService.downloadFile(
      routeParams.url,
      routeParams.original_name,
      videoHeaders,
    );
  }, [fileService, routeParams.url, routeParams.original_name, videoHeaders]);

  return (
    <>
      <Alert
        visible={screenshotAlertVisible}
        title={t("account.security.screenshot_blocked_title")}
        content={t("account.security.screenshot_blocked_content")}
        okButtonAction={dismissScreenshotAlert}
      />
      <Container>
        <AnimatePresence>
          {!hiddenControls && (
            <HeaderContainer
              from={{ translateY: -50, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -50, opacity: 0 }}
              transition={{ duration: 350, type: "timing" }}
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
          <VideoView
            player={videoPlayer}
            style={{ width: "100%", height: "100%" }}
            allowsPictureInPicture={false}
            nativeControls={false}
          />
        </VideoPlayerWrapper>

        <PlayerControlsContainer onPress={handleHiddenControls}>
          <AnimatePresence>
            {!hiddenControls && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: "timing", duration: 200 }}
              >
                <PlayerButtonContainer>
                  <PlayerButton onPress={handlePlayPause} disabled={isLoading}>
                    <PlayerIcon>
                      {isLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.secondary || "#fff"}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={isPlaying ? "pause" : "play"}
                          color="#fff"
                          size={25}
                        />
                      )}
                    </PlayerIcon>
                  </PlayerButton>
                </PlayerButtonContainer>

                <PlayerControls>
                  <PlayerSeekContainer>
                    <PlayerPositionContainer>
                      <PlayerPosition>
                        {secondsToTime(Math.ceil(currentPosition))}
                      </PlayerPosition>
                    </PlayerPositionContainer>

                    <PlayerSeek
                      minimumValue={0}
                      maximumValue={duration > 0 ? duration : 1}
                      value={currentPosition}
                      step={0.1}
                      thumbTintColor={colors.secondary}
                      minimumTrackTintColor={colors.secondary}
                      maximumTrackTintColor={colors.dark_gray}
                      onSlidingStart={handleSlidingStart}
                      onValueChange={handleValueChange}
                      onSlidingComplete={handleSlidingComplete}
                    />

                    <PlayerPositionContainer>
                      <PlayerPosition>
                        {secondsToTime(Math.ceil(duration))}
                      </PlayerPosition>
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
