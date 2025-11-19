import styled from "styled-components/native";
import fonts from "@styles/fonts";
import CachedImage from "@components/CachedImage";

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  padding: 0px 15px;
`;

export const YourInviteContainer = styled.View`
  margin: 15px 0px;
  background-color: ${(props) => props.theme.colors.shape};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  padding: 12px;
  border-radius: 5px;
`;

export const YourInviteTitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.black};
  text-align: center;
`;

export const YourInviteSubtitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
  margin: 10px 0px;
`;

export const YourInviteLinkContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 25px;
  padding: 5px 10px;
`;

export const YourInviteLinkText = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
  align-items: center;
  justify-content: center;
`;

export const YourInviteCopyButton = styled.TouchableOpacity``;

export const NewInviteContainer = styled.View``;

export const NewInviteButton = styled.TouchableOpacity``;

export const NewInviteButtonText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

export const InviteFriendsContainer = styled.View`
  margin-top: 20px;
`;

export const InviteFriendsTitle = styled(YourInviteTitle)`
  text-align: left;
  font-size: 20px;
`;

export const InviteFriendsSubtitle = styled(YourInviteSubtitle)`
  color: ${(props) => props.theme.colors.secondary};
  text-align: left;
  margin-bottom: 15px;
`;

export const FriendsListContainer = styled.View`
  margin-bottom: 20px;
`;

export const FriendContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const FriendWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendAvatar = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const FriendName = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const FriendInviteButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    !props.disabled
      ? props.theme.colors.primary
      : props.theme.colors.dark_gray};
  padding: 5px 10px;
  border-radius: 8px;
`;

export const FriendInviteButtonText = styled.Text`
  font-size: 13px;
  font-family: ${fonts["text-bold"]};
  color: #fff;
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
