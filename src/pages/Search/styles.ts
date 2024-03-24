import styled from "styled-components/native";
import fonts from "@styles/fonts";
import LottieView from "lottie-react-native";
import { memo } from "react";
import CachedImage from "@components/CachedImage";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const SearchContainer = styled.View`
  width: 100%;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const InputContainer = styled.View`
  padding: 0px 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.shape};
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonSearch = styled.TouchableOpacity`
  height: 100%;
  width: 50px;
  background-color: ${(props) => props.theme.colors.secondary};
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  elevation: 3;
`;

export const ButtonBarContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
`;

export const ButtonBar = styled.TouchableOpacity`
  height: 50px;
  background-color: ${(props) => props.theme.colors.light_primary};
  margin-right: 15px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #fff;
`;

export const ButtonBarTitle = styled.Text`
  font-family: ${fonts.heading};
  color: #fff;
  text-align: center;
`;

export const NoResultsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoResultAnimation = styled(LottieView)`
  width: 300px;
  height: 300px;
`;

export const NoResultText = styled.Text`
  font-family: ${fonts.heading};
  font-size: 20px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const NoResultSubText = styled.Text`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const ResultsContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

export const GroupCard = memo(styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.shape};
  elevation: 2;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
`);

export const GroupInfosContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const GroupImage = styled(CachedImage)`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

export const GroupName = styled.Text`
  flex: 1;
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
`;

export const GroupDesc = styled.Text`
  flex: 1;
  font-family: ${fonts.text};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
`;

export const GroupParticipantsText = styled.Text`
  width: 100%;
  margin-top: 5px;
  font-size: 12px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.primary};
  text-align: right;
`;
