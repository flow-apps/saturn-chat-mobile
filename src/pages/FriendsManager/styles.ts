import styled from "styled-components/native";
import CachedImage from "../../components/CachedImage";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const FriendsList = styled.View`
  padding: 15px;
`;

export const Friend = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const FriendInfos = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendAvatarContainer = styled.View`
  margin-right: 10px;
`;

export const FriendAvatar = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

export const FriendName = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const UnFriendButton = styled.TouchableOpacity`
`;
