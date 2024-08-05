import fonts from "@styles/fonts";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InputField = styled.TextInput`
  text-align: center;
  width: 60px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.black};
  font-size: 17px;
  margin-top: 5px;
`;

export const ActionButtonContainer = styled.TouchableHighlight``;

export const ActionButtonText = styled.Text`
`;

export const InfinityText = styled.Text`
  text-align: center;
  padding: 0px 10px;
  font-family: ${fonts.text};
  font-size: 14px;
`;
