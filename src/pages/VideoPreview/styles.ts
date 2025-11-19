import styled from "styled-components/native";
import { Video } from "expo-av";
import fonts from "@styles/fonts";
import Slider from "@react-native-community/slider";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { MotiView } from "moti";

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled(MotiView)`
  position: absolute;
  width: 100%;
  background-color: transparent;
  z-index: 20;
  top: ${getStatusBarHeight() - 20}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const HeaderButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-family: ${fonts["text-bold"]};
  font-size: 12px;
  flex: 1;
`;

export const VideoPlayerWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const VideoPlayer = styled(Video)`
  width: 100%;
  height: 100%;
`;

export const BufferingContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: #00000088;
`;

export const PlayerControlsContainer = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

export const PlayerControls = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  background-color: #00000055;
  padding: 30px 10px;
`;

export const PlayerIcon = styled.Text``;

export const PlayerButtonContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const PlayerButton = styled.TouchableOpacity`
  background-color: #00000088;
  padding: 18px;
  border-radius: 50px;
  z-index: 15;
`;

export const PlayerSeekContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const PlayerSeek = styled(Slider)`
  flex: 1;
`;

export const PlayerPositionContainer = styled.View``;

export const PlayerPosition = styled.Text`
  color: #fff;
  font-family: ${fonts.text};
  font-size: 12px;
  margin: 0 5px;
`;
