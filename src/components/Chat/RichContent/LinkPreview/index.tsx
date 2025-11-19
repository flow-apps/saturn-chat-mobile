import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { LinkData } from "@type/interfaces";
import {
  Container,
  VideoIndicator,
  VideoIndicatorContainer,
  VideoIndicatorText,
  WebsiteDescription,
  WebsiteDescriptionContainer,
  WebsiteFavicon,
  WebsiteFaviconContainer,
  WebsiteHeaderContainer,
  WebsiteImage,
  WebsiteImageContainer,
  WebsiteName,
  WebsiteNameContainer,
  WebsiteTitle,
  WebsiteTitleContainer,
} from "./styles";

import * as Clipboard from "expo-clipboard";
import SimpleToast from "react-native-simple-toast";
import { useImageDimensions } from "@react-native-community/hooks/lib/useImageDimensions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import YouTubeIFrame, {
  IYouTubeIFrameRef,
} from "@components/Chat/RichContent/YouTubeIFrame";
import URLParse from "url-parse";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MotiView } from "moti";
import { useTranslate } from "@hooks/useTranslate";

interface LinkPreviewProps {
  link: LinkData;
  openLink: (link: string) => void;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link, openLink }) => {
  const ytIFrameRef = useRef<IYouTubeIFrameRef>(null);
  const [videoId, setVideoId] = useState("");
  const { dimensions, loading, error } = useImageDimensions({
    uri: link.image,
  });
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("Components.Chat.LinkPreview");

  const copyLink = useCallback(async () => {
    await Clipboard.setStringAsync(link.link);
    SimpleToast.show(t("link_copied"),SimpleToast.SHORT);
  }, [link]);

  const handlePreview = useCallback(() => {
    if (videoId) {
      return ytIFrameRef.current.openYouTubeIFrameModal();
    }

    navigation.navigate("ImagePreview", { name: link.link, url: link.image });
  }, [videoId]);

  useEffect(() => {
    const YTUrls = ["youtube.com", "youtu.be"];
    const { host, pathname, query } = new URLParse(
      link.link.replace("www.", ""),
      true
    );

    if (YTUrls.includes(host)) {
      setVideoId(query.v || pathname.split("/").pop());
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      {!!videoId && (
        <YouTubeIFrame ref={ytIFrameRef} title={link.title} videoId={videoId} />
      )}
      <Container>
        {!!link.siteName && (
          <WebsiteNameContainer>
            <WebsiteName>{link.siteName}</WebsiteName>
          </WebsiteNameContainer>
        )}
        <WebsiteHeaderContainer>
          <WebsiteTitleContainer
            onLongPress={copyLink}
            onPress={() => openLink(link.link)}
          >
            {!!link.favicon && (
              <WebsiteFaviconContainer>
                <WebsiteFavicon width={45} height={45} uri={link.favicon} />
              </WebsiteFaviconContainer>
            )}
            <WebsiteTitle numberOfLines={2}>
              {link.title || link.link}
            </WebsiteTitle>
          </WebsiteTitleContainer>
        </WebsiteHeaderContainer>
        {!!link.description && (
          <WebsiteDescriptionContainer>
            <WebsiteDescription numberOfLines={4}>
              {link.description}
            </WebsiteDescription>
          </WebsiteDescriptionContainer>
        )}
        {!!link.image && !error && (
          <WebsiteImageContainer onPress={handlePreview}>
            <WebsiteImage
              aspectRatio={dimensions.aspectRatio}
              uri={link.image}
            />
            {!!videoId && (
              <VideoIndicatorContainer
                onPress={handlePreview}
                activeOpacity={0.5}
              >
                <MotiView
                  transition={{
                    repeat: 3,
                    type: "timing",
                    duration: 1500,
                  }}
                >
                  <VideoIndicator>
                    <MaterialCommunityIcons
                      name="play-circle"
                      size={35}
                      color="#fff"
                    />
                    <VideoIndicatorText>{t("watch_text")}</VideoIndicatorText>
                  </VideoIndicator>
                </MotiView>
              </VideoIndicatorContainer>
            )}
          </WebsiteImageContainer>
        )}
      </Container>
    </>
  );
};

export default memo(LinkPreview, (prev, next) => {
  return prev.link.link === next.link.link;
});
