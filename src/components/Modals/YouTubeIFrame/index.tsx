import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import YouTubeVideoPlayer, {
  IYouTubeControllers,
} from "../../Chat/YouTubeVideoPlayer";
import {
  Container,
  YouTubeModal,
  YouTubeModalHeader,
  YouTubeModalHeaderButton,
} from "./styles";

const YouTubeIFrame: React.FC = () => {
  const [videoStatus, setVideoStatus] = useState<"PLAYING" | "PAUSED">(
    "PLAYING"
  );
  const [modalVisible, setModalVisible] = useState(true);
  const ytPlayerRef = useRef<IYouTubeControllers>(null);

  const playPauseVideo = useCallback(() => {
    if (videoStatus === "PLAYING") {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
    }

    setVideoStatus((old) => (old === "PLAYING" ? "PAUSED" : "PLAYING"));
  }, [ytPlayerRef]);

  const onUpdateTime = useCallback((time: number) => {}, []);

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
          videoId="oGUg8YtEHwU"
          onUpdateTime={onUpdateTime}
          autoplay
        />
      </YouTubeModal>
    </Container>
  );
};

export default YouTubeIFrame;
