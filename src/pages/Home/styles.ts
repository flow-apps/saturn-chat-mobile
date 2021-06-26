import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const QuickAccessGroupsContainer = styled.View`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  justify-content: center;
`;

export const QuickAccessTitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin-bottom: 10px;
`;

export const QuickAccessGroupsScroll = styled.View`
  width: ${Dimensions.get("screen").width}px;
  flex-direction: row;
`;

export const NewGroupButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${(props) => props.theme.colors.secondary};
  border-radius: 35px;
  margin-right: 15px;
  margin-left: 15px;
`;

export const GroupButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const GroupImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const GroupsContainer = styled(Animated.View)`
  flex: 1;
  margin-top: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 0 20px;
  elevation: 10;
  z-index: 5;
`;

export const TitleWrapper = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

export const GroupsTitle = styled.Text`
  font-size: 28px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin: 40px 0 10px 0;
`;

export const GroupsSubtitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
  margin-top: -10px;
`;

export const GroupsList = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.shape};
`;
