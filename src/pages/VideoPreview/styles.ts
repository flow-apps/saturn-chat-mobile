import styled from "styled-components/native";
import { Video } from "expo-av"
import fonts from "../../styles/fonts";
import { Dimensions } from "react-native";

import Slider from "@react-native-community/slider"

export const Container = styled.View`
  position: relative;
  flex: 1;
  background-color: #000000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VideoPlayerWrapper = styled.Pressable`
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
`

export const PlayerControlsContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  max-width: ${Dimensions.get("screen").width}px;
  padding: 5px;
  z-index: 10;
  background-color: #00000033;
`

export const PlayerControls = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
`

export const PlayerIcon = styled.Text``

export const PlayerButton = styled.TouchableOpacity`
  margin: 0 3px;
`

export const PlayerSeekContainer = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: ${Dimensions.get("screen").width}px;
  flex: 1;
`

export const PlayerSeek = styled(Slider)`
  flex: 1;
  margin-left: -5px;
`

export const PlayerPositionContainer = styled.View``

export const PlayerPosition = styled.Text`
  color: #fff;
  font-family: ${fonts.code};
  font-size: 12px;
  margin: 0 5px;
`
