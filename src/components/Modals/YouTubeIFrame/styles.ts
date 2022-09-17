import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Slider from "@react-native-community/slider";
import fonts from "../../../styles/fonts";

export const Container = styled.Modal`
  position: relative;
`;

export const YouTubeModal = styled.View`
  background-color: #000000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const YouTubeModalHeader = styled.View`
  width: 100%;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  padding-top: ${getStatusBarHeight() + 10}px;
  z-index: 10;
`;

export const YouTubeModalHeaderButton = styled.TouchableOpacity`
  margin: 0 5px;
`;

export const YouTubePlayerControlsContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  background-color: #00000055;
  z-index: 5;
  padding: 20px 0;
`;

export const YouTubePlayerControls = styled.View`
  flex: 1;
  width: 100%;
  height: 50%;
`;

export const YouTubePlayerPlayAndPauseContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const YouTubePlayerPlayAndPauseButton = styled.TouchableOpacity`
  background-color: #00000088;
  padding: 18px;
  border-radius: 50px;
`;

export const YouTubePlayerInfosContainer = styled.View`
  padding: 0 15px;
`;

export const YouTubePlayerInfos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const YouTubePlayerInfoContainer = styled.View``;

export const YouTubePlayerInfoText = styled.Text`
  color: #fff;
`;

export const YouTubePlayerSeekBarContainer = styled.View``;

export const YouTubePlayerSeekBar = styled(Slider)`
  font-size: 16px;
  font-family: ${fonts.text};
`;
