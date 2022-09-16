import React, { useCallback, useRef } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { YTService } from "../../../services/yt";

import { Container, VideoPlayerContainer } from "./styles";

interface ICurrentTimeData {
  type: "VIDEO_TIME_UPDATE";
  currentTime: number;
}

const YouTubeVideoPlayer: React.FC = () => {
  const ytService = new YTService();
  const webViewRef = useRef<WebView>(null);

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

      console.log(res);
    },
    []
  );

  return (
    <Container>
      <VideoPlayerContainer>
        <WebView
          ref={webViewRef}
          source={{ html: ytService.buildYouTubePlayerHTML("") }}
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo={false}
          scalesPageToFit={false}
          onMessage={onReceivedMessageWithTime}
          allowsInlineMediaPlayback
        />
      </VideoPlayerContainer>
    </Container>
  );
};

export default YouTubeVideoPlayer;
