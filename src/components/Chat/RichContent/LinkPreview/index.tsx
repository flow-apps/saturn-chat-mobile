import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { LinkData } from "../../../../../@types/interfaces";
import {
  Container,
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
import { useImageDimensions } from "@react-native-community/hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import YouTubeIFrame, {
  IYouTubeIFrameRef,
} from "../../../Modals/YouTubeIFrame";
import URLParse from "url-parse";

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
  const copyLink = useCallback(async () => {
    await Clipboard.setStringAsync(link.link);
    SimpleToast.show("Link copiado");
  }, [link]);

  const handlePreview = () => {
    if (videoId) {
      return ytIFrameRef.current.openYouTubeIFrameModal();
    }

    navigation.navigate("ImagePreview", { name: link.link, url: link.image });
  };

  useEffect(() => {
    const YTUrls = ["youtube.com", "youtu.be"];
    const { host, pathname } = new URLParse(link.link);

    if (YTUrls.includes(host)) {
      setVideoId(pathname.split("/").pop());
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <YouTubeIFrame ref={ytIFrameRef} videoId={videoId} />
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
        {!!link.image && (
          <WebsiteImageContainer onPress={handlePreview}>
            <WebsiteImage
              aspectRatio={error ? undefined : dimensions.aspectRatio}
              uri={link.image}
            />
          </WebsiteImageContainer>
        )}
      </Container>
    </>
  );
};

export default memo(LinkPreview);
