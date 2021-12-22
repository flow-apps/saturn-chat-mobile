import styled from "styled-components/native";
import fonts from "../../../../styles/fonts";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  height: 50px;
  border-radius: 10px;
  margin-top: -25px;
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
`

export const AudioPreviewButton = styled.TouchableOpacity``;

export const AudioPreviewSeekContainer = styled.View`
  flex: 1;
`;

export const AudioPreviewDurationContainer = styled.View``;

export const AudioPreviewSeek = styled.Slider`
`;

export const AudioPreviewDuration = styled.Text`
  font-family: ${fonts["mono-regular"]};
  color: ${({ theme }) => theme.colors.black}
  margin-right: 5px;
`;
