import fonts from "@styles/fonts";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 15px;
`;

export const TitleContainer = styled.View``;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.dark_heading};
  font-family: ${fonts.heading};
  font-size: 22px;
  margin: 15px 0;
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.dark_heading};
  font-family: ${fonts["text-bold"]};
  font-size: 16px;
`;

export const InputContainer = styled.View`
    margin: 25px 0; 
`;

export const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`;

export const CodeInput = styled.TextInput`
  width: 48px;
  height: 56px;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.shape};
`;
