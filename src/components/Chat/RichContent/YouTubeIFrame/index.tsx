import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AnimatePresence, MotiView } from "moti";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { useTheme } from "styled-components";
import { millisToTime } from "@utils/format";
import YouTubeVideoPlayer, {
  IYouTubeControllers,
} from "@components/YouTube/YouTubeVideoPlayer";
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
  YouTubeVideoTitle,
} from "./styles";
import { LinkUtils } from "@utils/link";
import { DateUtils } from "@utils/date"

interface IYouTubeIFrame {
  videoId: string;
  title: string;
}

export interface IYouTubeIFrameRef {
  openYouTubeIFrameModal: () => void;
}

const { convertToMillis } = new DateUtils()
const TIME_FOR_HIDE_CONTROLS = convertToMillis(3, "SECONDS");

const YouTubeIFrame: React.ForwardRefRenderFunction<
  IYouTubeIFrameRef,
  IYouTubeIFrame
> = ({ videoId, title }, ref) => {
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
  const linkUtils = new LinkUtils()

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
    await SystemNavigationBar.stickyImmersive();
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

  const openVideoOnYouTube = useCallback(() => {
    linkUtils.openLink(`https://youtube.com/v/${videoId}`)
  }, [videoId])

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
      <AnimatePresence>
      {!hiddenControls && (
        <YouTubeModalHeader
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
            <YouTubeModalHeaderButton onPress={handleCloseModal}>
              <Feather name="x" size={25} color="#fff" />
            </YouTubeModalHeaderButton>
            <YouTubeVideoTitle ellipsizeMode="middle" numberOfLines={1}>
              {title}
            </YouTubeVideoTitle>
            <YouTubeModalHeaderButton onPress={openVideoOnYouTube}>
              <FontAwesome name="youtube-play" size={25} color="#fff" />
            </YouTubeModalHeaderButton>
        </YouTubeModalHeader>
      )}
      </AnimatePresence>
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
