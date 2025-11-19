import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
  padding: 15px;
`;

export const PresentationContainer = styled.View`
`;

export const PresentationTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin: 15px 0px;
`;

export const PresentationSubtitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
  margin-bottom: 25px;
`;

export const EmptyListContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 50% 0px;
`;

export const EmptyListTitle = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.text};
`;
