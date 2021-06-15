import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ParticipantsContainer = styled.ScrollView`
  padding: 10px 15px;
`;

export const ParticipantsList = styled.View``;

export const SectionContainer = styled.View``;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  margin-bottom: 20px;
`;

export const ParticipantContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const ParticipantAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const ParticipanteName = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;
