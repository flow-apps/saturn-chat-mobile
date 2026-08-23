import styled from "styled-components/native";
import fonts from "@styles/fonts";
import CachedImage from "../../../CachedImage";

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  padding: 15px;
  border-radius: 12px;
  width: 85%;
  margin-top: 5px;
`;

export const WebsiteNameContainer = styled.View`
  margin: 10px 0px;
`;

export const WebsiteName = styled.Text`
  font-family: ${fonts.text};
  font-size: 8px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const WebsiteHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0px;
`;

export const WebsiteFaviconContainer = styled.View`
  width: 35px;
  height: 35px;
  margin-right: 12px;
`;

export const WebsiteFavicon = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 10px 0px;
`;

export const WebsiteImage = styled.Image<{ aspectRatio?: number }>`
  width: 100%;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio || 16 / 9};
`;

export const VideoIndicatorContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export const VideoIndicator = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #00000088;
  padding: 12px;
  border-radius: 8px;
`;

export const VideoIndicatorText = styled.Text`
  font-family: ${fonts.text};
  color: #fff;
`;
