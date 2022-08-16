import styled from "styled-components/native";
import fonts from "../../../../styles/fonts";

import Slider from "@react-native-community/slider";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -17px;
  padding: 0px 5px;
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
`;

export const AudioPreviewButton = styled.TouchableOpacity`
  margin-right: -5px;
`;

export const AudioPreviewSeekContainer = styled.View`
  flex: 1;
`;

export const AudioPreviewDurationContainer = styled.View``;

export const AudioPreviewSeek = styled(Slider)``;

export const AudioPreviewDuration = styled.Text`
  font-family: ${fonts["mono-regular"]};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 5px;
`;
