import styled from "styled-components/native";
import fonts from "@styles/fonts";
import Slider from "@react-native-community/slider"
import lighten from "polished/lib/color/lighten";

interface PlayerProps {
  loading?: boolean;
}

export const Container = styled.View<PlayerProps>`
  min-width: 100%;
  padding: 8px 15px;
  background-color: ${(props) => lighten(0.08, props.theme.colors.shape)};
  border-radius: 12px;
`;

export const AudioContainerWrapper = styled.View`
  align-items: center;
  justify-content: space-around;
`;

export const AudioControllerContainer = styled.View`
  flex-direction: row;
`;

export const AudioController = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SeekBarContainer = styled.View`
  flex: 1;
  margin-left: -2px;
  align-items: center;
  justify-content: center;
`;

export const SeekBar = styled(Slider)`
  width: 100%;
`;

export const AudioInfosContainer = styled.View``;

export const AudioDurationContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;

export const AudioDuration = styled.Text`
  font-family: ${fonts["mono-regular"]};
  margin-bottom: 5px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
`;
