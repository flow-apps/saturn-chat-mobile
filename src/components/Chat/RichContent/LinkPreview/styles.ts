import { useImageDimensions } from "@react-native-community/hooks";
import { lighten } from "polished";
import styled from "styled-components/native";
import fonts from "../../../../styles/fonts";
import CachedImage from "../../../CachedImage";

export const Container = styled.View`
  background-color: ${(props) => lighten(0.08, props.theme.colors.shape)};
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  min-width: 300px;
  margin-top: 5px;
`;

export const WebsiteNameContainer = styled.View`
  margin-bottom: 5px;
`;

export const WebsiteName = styled.Text`
  font-family: ${fonts.text};
  font-size: 8px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const WebsiteHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const WebsiteFaviconContainer = styled.View`
  border-radius: 8px;
  margin-right: 10px;
`;

export const WebsiteFavicon = styled(CachedImage)`
  width: 45px;
  height: 45px;
  color: #fff;
`;

export const WebsiteTitleContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const WebsiteTitle = styled.Text`
  font-size: 12px;
  font-family: ${fonts["text-bold"]};
  color: ${(props) => props.theme.colors.primary};
  flex: 1;
`;

export const WebsiteDescriptionContainer = styled.View`
  margin-top: 5px;
`;

export const WebsiteDescription = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
`;

export const WebsiteImageContainer = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const WebsiteImage = styled(CachedImage)<{ aspectRatio?: number }>`
  max-width: 100%;
  aspect-ratio: ${(props) => props.aspectRatio};
  border-radius: 8px;
  margin: 0 auto;
`;
