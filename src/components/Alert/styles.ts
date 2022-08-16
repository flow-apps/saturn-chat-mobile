import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.Modal``;

export const AlertContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00000055;
`;

export const AlertTitle = styled.Text`
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const AlertContent = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.text};
  font-size: 16px;
`;

export const AlertModal = styled.View`
  width: 90%;
  min-height: 220px;
  z-index: 150;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 25px 18px;
  border-radius: 12px;
  justify-content: space-around;
`;

export const AlertButtonsContainer = styled.View`
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: 10px;
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
  margin-right: 25px;
`;

export const AlertCancelButtonText = styled(AlertOkButtonText)`
  color: ${(props) => props.theme.colors.red};
`;

export const AlertExtraButton = styled(AlertOkButton)`
  margin-left: auto;
`;

export const AlertExtraButtonText = styled(AlertOkButtonText)`
  color: ${(props) => props.theme.colors.secondary};
`;
