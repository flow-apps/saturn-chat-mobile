import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { YTService } from "@services/yt";

import { Container, VideoPlayerContainer } from "./styles";

interface ICurrentTimeData {
  type: "VIDEO_TIME_UPDATE" | "VIDEO_DURATION";
  currentTime?: number;
  duration?: number;
}

export interface IYouTubeControllers {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (time: number) => void;
  duration: number;
}

interface IYouTubeVideoPlayer {
  videoId: string;
  onUpdateTime: (time: number) => void;
  autoplay?: boolean;
}

const YouTubeVideoPlayer: React.ForwardRefRenderFunction<
  IYouTubeControllers,
  IYouTubeVideoPlayer
> = ({ videoId, onUpdateTime, autoplay }, ref) => {
  const ytService = new YTService();
  const webViewRef = useRef<WebView>(null);

  const [duration, setDuration] = useState(0);

  const playVideo = useCallback(() => {
    webViewRef.current.injectJavaScript("play()");
  }, [webViewRef]);

  const pauseVideo = useCallback(() => {
    webViewRef.current.injectJavaScript("pause()");
  }, [webViewRef]);

  const seekTo = useCallback(
    (time: number) => {
      webViewRef.current.injectJavaScript(`seekTo(${time})`);
    },
    [webViewRef]
  );

  const onReceivedMessageWithTime = useCallback(
    (message: WebViewMessageEvent) => {
      const res: ICurrentTimeData = JSON.parse(message.nativeEvent.data);

      if (res.type === "VIDEO_TIME_UPDATE") {
        return onUpdateTime(res.currentTime);
      }

      if (res.type === "VIDEO_DURATION") {
        setDuration(res.duration);
      }
    },
    [onUpdateTime]
  );

  const onLoadEnd = () => {
    if (autoplay) {
      playVideo();
    }
  };

  useImperativeHandle(ref, () => ({
    playVideo,
    pauseVideo,
    seekTo,
    duration,
  }));

  return (
    <Container>
      <VideoPlayerContainer>
        <WebView
          ref={webViewRef}
          onMessage={onReceivedMessageWithTime}
          onLoad={onLoadEnd}
          source={{ html: ytService.buildYouTubePlayerHTML(videoId) }}
          bounces={false}
          scrollEnabled={false}
          scalesPageToFit={false}
          allowsFullscreenVideo={false}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          style={{ backgroundColor: "transparent" }}
        />
      </VideoPlayerContainer>
    </Container>
  );
};

export default forwardRef(YouTubeVideoPlayer);
