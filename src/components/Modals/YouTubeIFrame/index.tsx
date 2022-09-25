import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { secondsToMilliseconds } from "date-fns";
import { AnimatePresence, MotiView } from "moti";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StatusBar } from "react-native";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { useTheme } from "styled-components";
import { millisToTime } from "../../../utils/format";
import YouTubeVideoPlayer, {
  IYouTubeControllers,
} from "../../YouTube/YouTubeVideoPlayer";
import {
  Container,
  YouTubeModal,
  YouTubeModalHeader,
  YouTubeModalHeaderButton,
  YouTubePlayerControls,
  YouTubePlayerControlsContainer,
  YouTubePlayerInfoContainer,
  YouTubePlayerInfos,
  YouTubePlayerInfosContainer,
  YouTubePlayerInfoText,
  YouTubePlayerPlayAndPauseButton,
  YouTubePlayerPlayAndPauseContainer,
  YouTubePlayerSeekBar,
  YouTubePlayerSeekBarContainer,
} from "./styles";

interface IYouTubeIFrame {
  videoId: string;
}

export interface IYouTubeIFrameRef {
  openYouTubeIFrameModal: () => void;
}

const TIME_FOR_HIDE_CONTROLS = secondsToMilliseconds(6);

const YouTubeIFrame: React.ForwardRefRenderFunction<
  IYouTubeIFrameRef,
  IYouTubeIFrame
> = ({ videoId }, ref) => {
  const [videoStatus, setVideoStatus] = useState<"PLAYING" | "PAUSED">(
    "PLAYING"
  );
  const [videoDuration, setVideoDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hiddenControls, setHiddenControls] = useState(true);
  const [hiddenControlsTimeout, setHiddenControlsTimeout] =
    useState<NodeJS.Timeout>();
  const ytPlayerRef = useRef<IYouTubeControllers>(null);

  const { colors } = useTheme();

  const playPauseVideo = useCallback(() => {
    if (videoStatus === "PLAYING") {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
    }

    setVideoStatus((old) => (old === "PLAYING" ? "PAUSED" : "PLAYING"));
  }, [ytPlayerRef, videoStatus]);

  const seekTo = useCallback(
    (time: number) => {
      ytPlayerRef.current.seekTo(time);
    },
    [ytPlayerRef]
  );

  const onUpdateTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const openYouTubeIFrameModal = useCallback(async () => {
    setModalVisible(true);
    await SystemNavigationBar.stickyImmersive()
  }, [modalVisible]);

  const handleCloseModal = useCallback(async () => {
    await SystemNavigationBar.navigationShow();
    setModalVisible(false);
  }, [modalVisible]);

  const hideAndShowControls = useCallback(async () => {
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
  }, [hiddenControls, hiddenControlsTimeout]);


  useEffect(() => {
    if (ytPlayerRef.current) {
      setVideoDuration(ytPlayerRef.current.duration);
    }
  }, [ytPlayerRef.current]);

  useImperativeHandle(ref, () => ({
    openYouTubeIFrameModal,
  }));

  return (
    <Container
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      statusBarTranslucent
    >
      {!hiddenControls && (
        <YouTubeModalHeader
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 300 }}
        >
          <YouTubeModalHeaderButton onPress={handleCloseModal}>
            <Feather name="x" size={25} color="#fff" />
          </YouTubeModalHeaderButton>
        </YouTubeModalHeader>
      )}
      <YouTubeModal>
        <YouTubeVideoPlayer
          ref={ytPlayerRef}
          videoId={videoId}
          onUpdateTime={onUpdateTime}
          autoplay
        />
        <YouTubePlayerControlsContainer onPress={hideAndShowControls}>
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
                style={{ flex: 1 }}
              >
                <YouTubePlayerControls>
                  <YouTubePlayerPlayAndPauseContainer>
                    <YouTubePlayerPlayAndPauseButton
                      activeOpacity={0.7}
                      onPress={playPauseVideo}
                    >
                      <MaterialCommunityIcons
                        name={videoStatus === "PLAYING" ? "pause" : "play"}
                        size={33}
                        color="#fff"
                      />
                    </YouTubePlayerPlayAndPauseButton>
                  </YouTubePlayerPlayAndPauseContainer>
                  <YouTubePlayerInfosContainer>
                    <YouTubePlayerInfos>
                      <YouTubePlayerInfoContainer>
                        <YouTubePlayerInfoText>
                          {millisToTime(currentTime * 1000)}
                        </YouTubePlayerInfoText>
                      </YouTubePlayerInfoContainer>
                      <YouTubePlayerInfoContainer>
                        <YouTubePlayerInfoText>
                          {millisToTime(videoDuration * 1000)}
                        </YouTubePlayerInfoText>
                      </YouTubePlayerInfoContainer>
                    </YouTubePlayerInfos>
                  </YouTubePlayerInfosContainer>
                  <YouTubePlayerSeekBarContainer>
                    <YouTubePlayerSeekBar
                      value={currentTime}
                      minimumValue={0}
                      maximumValue={videoDuration}
                      thumbTintColor={colors.secondary}
                      minimumTrackTintColor={colors.secondary}
                      maximumTrackTintColor={colors.dark_gray}
                      onSlidingComplete={seekTo}
                    />
                  </YouTubePlayerSeekBarContainer>
                </YouTubePlayerControls>
              </MotiView>
            )}
          </AnimatePresence>
        </YouTubePlayerControlsContainer>
      </YouTubeModal>
    </Container>
  );
};

export default forwardRef(YouTubeIFrame);
