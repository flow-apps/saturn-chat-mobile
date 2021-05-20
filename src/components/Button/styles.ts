import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface ButtonProps {
  transparent?: boolean;
  textColor?: string;
}

interface TextProps {
  textColor?: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  padding: 20px;
  background: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.primary};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<TextProps>`
  text-align: center;
  color: ${(props) => props.textColor || "#ffffff"};
  font-size: 18px;
  font-family: ${fonts.heading};
`;
