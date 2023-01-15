import styled from "styled-components/native";
import CachedImage from "../../components/CachedImage";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
  padding: 15px;
`;

export const PresentationContainer = styled.View`
  margin-bottom: 15px;
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
  margin-bottom: 5px;
`;

export const FriendsListContainer = styled.View`
  margin-top: 15px;
`;

export const FriendContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const FriendLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const FriendAvatar = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const FriendName = styled.Text`
  font-size: 17px;
  font-family: ${fonts.text};
  margin-left: 10px;
  color: ${(props) => props.theme.colors.dark_heading};
`;

export const UnreadMessages = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  width: 50px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

export const UnreadMessagesText = styled.Text`
  color: #fff;
  font-family: ${fonts.heading};
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

export const AdContainer = styled.View`
  width: 100%;
`;
