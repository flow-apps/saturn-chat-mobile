import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled(RectButton)`
  padding: 20px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  font-family: ${fonts.heading};
`;
