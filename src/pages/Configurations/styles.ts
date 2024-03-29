import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const SectionsContainer = styled.View`
  padding: 15px;
`;

export const SectionContainer = styled.View``;

export const SectionTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 18px;
  color: ${(props) => props.theme.colors.dark_heading};
  margin: 15px 0px;
`;

export const ConfigsContainer = styled.View`
  margin-top: 10px;
`;

export const ConfigContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px 0;
`;

type ConfigTitleProps = {
  color?: string;
}

export const ConfigTitle = styled.Text<ConfigTitleProps>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.color ? props.color : props.theme.colors.black};
`;

export const CurrentValueText = styled(ConfigTitle)`
  color: ${(props) => props.theme.colors.dark_heading};
`
