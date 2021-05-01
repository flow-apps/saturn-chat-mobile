import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
`;

export const MyProfileContainer = styled.View`
  flex: 1;
`;

export const BasicInfosContainer = styled.View``;

export const ImagesContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const Banner = styled.View`
  background: ${(props) => props.theme.colors.secondary};
  height: 200px;
  width: 100%;
`;

export const Avatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  position: relative;
  top: -90px;
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

export const FollowInfosContainer = styled.View`
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const FollowingContainer = styled.View``;

export const FollowerContainer = styled.View``;

export const FollowNumber = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
`;

export const FollowTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  text-align: center;
  margin-top: -5px;
`;

export const GroupsContainer = styled.View`
  margin: 20px 0;
  padding: 0 15px;
`;

export const GroupsTitle = styled.Text`
  font-size: 25px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const Groups = styled.View``;
