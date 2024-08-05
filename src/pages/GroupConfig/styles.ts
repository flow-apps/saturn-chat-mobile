import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "@styles/fonts";

interface OptionTextProps {
  color?: string;
}

interface SectionTitleProps {
  color?: string;
}

interface OptionContainerProps {
  hidden?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const OptionsContainer = styled.View`
  width: 100%;
  margin-top: -5px;
  flex: 1;
`;

export const SectionTitle = styled.Text<SectionTitleProps>`
  font-size: 18px;
  font-family: ${fonts.heading};
  margin: 15px 0;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.dark_heading};
`;

export const OptionContainer = styled.View<OptionContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  flex: 1;
  margin-bottom: 5px;
`;

export const OptionActionContainer = styled.View`
`;

export const OptionText = styled.Text<OptionTextProps>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.color || props.theme.colors.black};
  flex: 1;
  width: 100%;
`;
