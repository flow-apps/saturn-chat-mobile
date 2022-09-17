import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
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

const YouTubeIFrame: React.ForwardRefRenderFunction<IYouTubeIFrameRef, IYouTubeIFrame> = (
  { videoId },
  ref
) => {
  const [videoStatus, setVideoStatus] = useState<"PLAYING" | "PAUSED">(
    "PLAYING"
  );
  const [videoDuration, setVideoDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
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

  const seekTo = useCallback((time: number) => {
    ytPlayerRef.current.seekTo(time);
  }, []);

  const onUpdateTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const openYouTubeIFrameModal = useCallback(() => {
    setModalVisible(true);
  }, [modalVisible]);

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
      animationType="slide"
      statusBarTranslucent
      onDismiss={() => setModalVisible(false)}
    >
      <YouTubeModalHeader>
        <YouTubeModalHeaderButton>
          <Feather
            onPress={() => setModalVisible(false)}
            name="x"
            size={25}
            color="#fff"
          />
        </YouTubeModalHeaderButton>
        <YouTubeModalHeaderButton>
          <MaterialCommunityIcons name="fullscreen" size={28} color="#fff" />
        </YouTubeModalHeaderButton>
      </YouTubeModalHeader>
      <YouTubeModal>
        <YouTubeVideoPlayer
          ref={ytPlayerRef}
          videoId={videoId}
          onUpdateTime={onUpdateTime}
          autoplay
        />
        <YouTubePlayerControlsContainer>
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
        </YouTubePlayerControlsContainer>
      </YouTubeModal>
    </Container>
  );
};

export default forwardRef(YouTubeIFrame);
