import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface ContainerProps {
  show: boolean;
}

export const Container = styled.View<ContainerProps>`
  display: ${(props) => (!props.show ? "none" : "flex")};
  flex: 1;
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  position: absolute;
  left: 0;
  z-index: 100;
`;

export const ToastContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00000055;
`;

export const ToastTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 18px;
`;

export const ToastContent = styled.Text`
  font-family: ${fonts.text};
  font-size: 16px;
`;

export const ToastModal = styled.View`
  width: 90%;
  height: 220px;
  z-index: 150;
  background-color: ${(props) => props.theme.colors.white};
  padding: 25px 18px;
  border-radius: 12px;
  justify-content: space-around;
`;

export const ToastButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ToastOkButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const ToastOkButtonText = styled.Text`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ToastCancelButton = styled(ToastOkButton)`
  margin-left: 25px;
`;

export const ToastCancelButtonText = styled(ToastOkButtonText)`
  color: ${(props) => props.theme.colors.red};
`;
