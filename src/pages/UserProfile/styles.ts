import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { FriendsStates } from "../../../@types/enums";
import fonts from "../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const UserProfileContainer = styled.View`
  flex: 1;
`;

export const BasicInfosContainer = styled.View``;

export const ImagesContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const Banner = styled.View`
  background: ${(props) => props.theme.colors.shape};
  height: 200px;
  width: 100%;
`;

export const AvatarContainer = styled.TouchableOpacity`
  position: relative;
  top: -90px;
  z-index: 5;
`;

export const Avatar = styled(FastImage)`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const BasicInfos = styled.View`
  margin-top: -70px;
`;

export const UserName = styled.Text`
  font-size: 25px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
  margin-bottom: 15px;
`;

export const BioContainer = styled.View`
  padding: 0px 15px;
`;

export const BioContent = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.quote};
  margin-top: 20px;
`;

export const AddFriendContainer = styled.View`
  align-items: center;
  margin: 10px 0px;
`;

export const FriendButton = styled.TouchableOpacity<{ state?: FriendsStates }>`
  padding: 10px 15px;
  border: 2px solid
    ${(props) => {
      if (!props.state) {
        return props.theme.colors.primary;
      } else if (props.state === FriendsStates.REQUESTED) {
        return props.theme.colors.secondary;
      } else {
        return "transparent";
      }
    }};
  border-radius: 30px;
  background-color: ${(props) => {
    if (!props.state || props.state === FriendsStates.REQUESTED) {
      return "transparent";
    } else {
      return props.theme.colors.primary;
    }
  }}; ;
`;

export const FriendButtonText = styled.Text<{ state?: FriendsStates }>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const GroupsContainer = styled.View`
  margin: 20px 0;
  padding: 0 15px;
`;

export const GroupsTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin-bottom: 10px;
`;

export const Groups = styled.View``;
