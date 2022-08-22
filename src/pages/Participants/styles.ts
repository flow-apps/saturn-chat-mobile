import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import { ParticipantsData } from "../../../@types/interfaces";
import CachedImage from "../../components/CachedImage";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ParticipantsContainer = styled.View`
  padding: 10px 15px;
`;

export const ParticipantsList =
  styled.FlatList`` as unknown as FlatList<ParticipantsData>;

export const SectionContainer = styled.View``;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  margin-bottom: 20px;
`;

export const ParticipantContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const OwnerTagContainer = styled.View`
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 20px;
  padding: 5px 20px;
  background-color: ${(props) => props.theme.colors.shape};
  align-items: center;
  justify-content: center;
`;

export const OwnerTag = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.heading};
`;

export const ParticipantInfosWrapper = styled.View`
  justify-content: space-around;
`;

export const JoinedDateContainer = styled.View``;

export const JoinedDate = styled.Text`
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.text};
`;

export const Participant = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ParticipantAvatarContainer = styled.View`
  position: relative;
`;

export const ParticipantStatus = styled.View<{ status: "ONLINE" | "OFFLINE" }>`
  position: absolute;
  background-color: ${(props) =>
    props.status === "ONLINE"
      ? props.theme.colors.green
      : props.theme.colors.dark_gray};

  border: 1.5px solid
    ${(props) =>
      props.status === "ONLINE"
        ? props.theme.colors.green + "99"
        : props.theme.colors.dark_gray + "99"};
  width: 12px;
  height: 12px;
  border-radius: 6px;
  bottom: 0px;
  right: 15px;
`;

export const ParticipantAvatar = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const ParticipanteName = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.black};
`;

export const AdBannerWrapper = styled.View`
  margin: 5px 0px;
`;
