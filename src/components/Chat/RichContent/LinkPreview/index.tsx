import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MotiView } from "moti";
import { useTranslate } from "@hooks/useTranslate";

interface LinkPreviewProps {
  link: LinkData;
  openLink: (link: string) => void;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link, openLink }) => {
  const ytIFrameRef = useRef<IYouTubeIFrameRef>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [displayTitle, setDisplayTitle] = useState(link.title || link.link);

  const isYoutubeLink = useMemo(() => !!videoId, [videoId]);

  const imageUri = useMemo(() => {
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return link.image;
  }, [videoId, link.image]);

  const { dimensions, loading, error } = useImageDimensions({
    uri: imageUri,
  });
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("Components.Chat.LinkPreview");

  const copyLink = useCallback(async () => {
    await Clipboard.setStringAsync(link.link);
    SimpleToast.show(t("link_copied"),SimpleToast.SHORT);
  }, [link]);

  const handlePreview = useCallback(() => {
    if (isYoutubeLink) {
      return ytIFrameRef.current.openYouTubeIFrameModal();
    }

    navigation.navigate("ImagePreview", { name: link.link, url: link.image });
  }, [isYoutubeLink, link.image, link.link, navigation]);

  useEffect(() => {
    const fetchYouTubeData = async () => {
      const regExp =
        /(?:[?&]v=|youtu\.be\/|\/(?:embed|v|shorts|live)\/)([a-zA-Z0-9_-]{11})/;
      const match = link.link.match(regExp);
      if (match && match[1]) {
        const currentVideoId = match[1];
        setVideoId(currentVideoId);
        try {
          const response = await fetch(
            `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${currentVideoId}`
          );
          const data = await response.json();
          if (data.title) {
            setDisplayTitle(data.title);
          }
        } catch (error) {}
      } else {
        setVideoId(null);
        setDisplayTitle(link.title || link.link);
      }
    };
    fetchYouTubeData();
  }, [link.link, link.title]);

  if (loading) {
    return <></>;
  }  

  return (
    <>
      {isYoutubeLink && (
        <YouTubeIFrame ref={ytIFrameRef} title={displayTitle} videoUrl={link.link} />
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
                <WebsiteFavicon width={75} height={75} uri={link.favicon} />
              </WebsiteFaviconContainer>
            )}
            <WebsiteTitle numberOfLines={2}>
              {displayTitle}
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
        {!!imageUri && !error && (
          <WebsiteImageContainer onPress={handlePreview}>
            <WebsiteImage
              aspectRatio={dimensions?.aspectRatio}
              uri={imageUri}
            />
            {isYoutubeLink && (
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
