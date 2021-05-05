import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
`;

export const ParticipantsContainer = styled.ScrollView`
  padding: 0 15px;
  margin-top: 20px;
`;

export const ParticipantsList = styled.View``;

export const SectionContainer = styled.View``;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
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
`;
