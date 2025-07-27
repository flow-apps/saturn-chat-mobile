import styled from "styled-components/native";
import fonts from "@styles/fonts";
import darken from "polished/lib/color/darken";
import CachedImage from "@components/CachedImage";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const UserProfileContainer = styled.View`
  flex: 1;
`;

export const BasicInfosContainer = styled.View``;

export const FriendsContainer = styled.TouchableOpacity``;

export const FriendsInfosContainer = styled.View`
  margin-top: 10px;
  background-color: ${(props) => darken(0.085, props.theme.colors.shape)};
  padding: 10px;
`;

export const FriendsNumber = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
`;

export const FriendsTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  text-align: center;
  margin-top: -5px;
  color: ${(props) => props.theme.colors.black};
`;

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

export const Avatar = styled(CachedImage)`
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

export const NicknameText = styled(UserName)`
  font-family: ${fonts.quote};
  font-size: 14px;
`;

export const BioContainer = styled.View`
  padding: 0px 15px;
`;

export const BioContent = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.quote};
  margin: 15px 0px;
  margin-bottom: 5px;
`;

export const AddFriendContainer = styled.View`
  align-items: center;
  margin: 10px 0px;
`;

export const GroupsContainer = styled.View`
  padding: 0 15px;
`;

export const GroupsTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin-bottom: 15px;
`;

export const Groups = styled.View``;
