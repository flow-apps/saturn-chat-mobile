import { Dimensions } from "react-native";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  position: absolute;
  left: 0;
  z-index: 100;
`;

export const AlertContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00000055;
`;

export const AlertTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 18px;
`;

export const AlertContent = styled.Text`
  font-family: ${fonts.text};
  font-size: 16px;
`;

export const AlertModal = styled.View`
  width: 90%;
  height: 220px;
  z-index: 150;
  background-color: ${(props) => props.theme.colors.white};
  padding: 25px 18px;
  border-radius: 12px;
  justify-content: space-around;
`;

export const AlertButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const AlertOkButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const AlertOkButtonText = styled.Text`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

export const AlertCancelButton = styled(AlertOkButton)`
  margin-left: 25px;
`;

export const AlertCancelButtonText = styled(AlertOkButtonText)`
  color: ${(props) => props.theme.colors.red};
`;
