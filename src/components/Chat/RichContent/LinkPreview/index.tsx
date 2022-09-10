import React, { memo } from "react";
import { LinkData } from "../../../../../@types/interfaces";
import {
  Container,
  WebsiteDescription,
  WebsiteDescriptionContainer,
  WebsiteFavicon,
  WebsiteFaviconContainer,
  WebsiteHeaderContainer,
  WebsiteName,
  WebsiteNameContainer,
  WebsiteTitle,
  WebsiteTitleContainer,
} from "./styles";

interface LinkPreviewProps {
  link: LinkData;
  openLink: (link: string) => void;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link, openLink }) => {    
  return (
    <Container>
      {!!link.siteName && (
        <WebsiteNameContainer>
          <WebsiteName>{link.siteName}</WebsiteName>
        </WebsiteNameContainer>
      )}
      <WebsiteHeaderContainer>
        {!!link.favicon && (
          <WebsiteFaviconContainer>
            <WebsiteFavicon uri={link.favicon} />
          </WebsiteFaviconContainer>
        )}
        <WebsiteTitleContainer onPress={() => openLink(link.link)}>
          <WebsiteTitle numberOfLines={2}>
            {link.title || link.link}
          </WebsiteTitle>
        </WebsiteTitleContainer>
      </WebsiteHeaderContainer>
      {!!link.description && (
        <WebsiteDescriptionContainer>
          <WebsiteDescription numberOfLines={4}>{link.description}</WebsiteDescription>
        </WebsiteDescriptionContainer>
      )}
    </Container>
  );
};

export default memo(LinkPreview);
