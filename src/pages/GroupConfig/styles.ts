import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface OptionTextProps {
  color?: string;
}

interface SectionTitleProps {
  color?: string;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

export const OptionsContainer = styled.View`
  width: 100%;
  margin-top: 15px;
`;

export const SectionTitle = styled.Text<SectionTitleProps>`
  font-size: 20px;
  font-family: ${fonts.heading};
  margin: 10px 0;
  margin-left: 7px;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.dark_heading};
`;

export const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const OptionText = styled.Text<OptionTextProps>`
  font-size: 18px;
  font-family: ${fonts.text};
  align-items: center;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.light_heading};
`;