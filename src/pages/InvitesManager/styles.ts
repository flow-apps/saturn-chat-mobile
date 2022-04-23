import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
  padding: 15px;
`;

export const PresentationContainer = styled.View``;

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
  margin-bottom: 15px;
`;

export const FriendRequestContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FriendRequestLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendRequestAvatar = styled(FastImage)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;

export const FriendRequestName = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  margin-left: 10px;
  color: ${(props) => props.theme.colors.black};
`;

export const FriendRequestRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendRequestActionButton = styled.TouchableOpacity`
  margin-left: 15px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 5px;
  border-radius: 20px;
`;
