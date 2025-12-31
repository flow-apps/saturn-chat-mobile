import styled from "styled-components/native";
import fonts from "@styles/fonts";

import Slider from "@react-native-community/slider";
import darken from "polished/lib/color/darken";

export const Container = styled.View`
  background-color: ${({ theme }) => darken(0.03, theme.colors.shape)};
  height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -17px;
  padding: 2px 5px;
`;

export const AudioPreviewContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 5px;
`;

export const AudioPreviewControllersWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 8px
`;

export const AudioPreviewButton = styled.TouchableOpacity`
  margin-right: -5px;
`;

export const AudioPreviewSeekContainer = styled.View`
  flex: 1;
  margin-left: 2px;
`;

export const AudioPreviewDurationContainer = styled.View`
  margin: 0px 5px;
`;

export const AudioPreviewSeek = styled(Slider)`
`;

export const AudioPreviewDuration = styled.Text`
  font-family: ${fonts["mono-regular"]};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;
