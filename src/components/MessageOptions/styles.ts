import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface OptionTextProps {
  color?: string;
}

export const Container = styled.Modal``;

export const MessageOptionsContainer = styled.View`
  flex: 1;
  background-color: #00000055;
  align-items: center;
  justify-content: center;
`;

export const MessageOptionsModal = styled.View`
  padding: 10px;
  width: 90%;
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 15px;
`;

export const Option = styled.TouchableOpacity`
  padding: 12px 0;
`;

export const OptionText = styled.Text<OptionTextProps>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => (props.color ? props.color : props.theme.colors.black)};
`;
