import styled from "styled-components/native";
import fonts from "@styles/fonts";
import FastImage from 'react-native-fast-image'
import { lighten } from "polished"

export const Container = styled.View`
  min-width: 100%;
  padding: 8px;
  background-color: ${(props) => lighten(0.08, props.theme.colors.shape)};
  border-radius: 10px;
  elevation: 3;
  margin: 10px 0px;
`;

export const FileContainer = styled.View`
  flex-direction: row;
  padding: 5px 0px 8px 0px;
`;

export const FileIconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const FileInfosContainer = styled.View`
  margin: 0px 10px;
  flex: 1;
  justify-content: center;
`;

export const FileName = styled.Text.attrs({
  numberOfLines: 1,
  lineBreakMode: "middle"
})`
  font-size: 12px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.black};
`;

export const FileSize = styled.Text`
  font-size: 11px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.primary};
`;

export const FileOpenAction = styled.View`
  align-items: center;
  justify-content: center;
`;

export const FileButton = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const FilePreviewContainer = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const FileImagePreview = styled(FastImage)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const FileIconActionWrapper = styled.View`
  position: absolute;
  z-index: 5;
`
