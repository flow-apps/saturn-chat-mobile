import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const GroupContainer = styled.View`
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

export const Avatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  position: relative;
  top: -90px;
`;

export const BasicInfos = styled.View`
  margin-top: -80px;
  padding: 10px;
`;

export const GroupName = styled.Text`
  font-size: 25px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
  margin-bottom: 5px;
`;

export const JoinGroupContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const JoinGroupButton = styled.TouchableOpacity<{
  participating?: boolean;
}>`
  padding: 10px 15px;
  border: ${(props) =>
    !props.participating
      ? `2px solid ${props.theme.colors.primary}`
      : "#00000000"};
  border-radius: 30px;
  background-color: ${(props) =>
    props.participating ? props.theme.colors.primary : "transparent"};
`;

export const JoinGroupButtonText = styled.Text<{ participating?: boolean }>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) =>
    props.participating ? props.theme.colors.black : "#fff"};
`;

export const GroupTagsContainer = styled.View``;

export const GroupTagsTitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  margin-bottom: 10px;
`;

export const GroupTagsScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const GroupTagContainer = styled.View`
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 12px;
  border-radius: 40px;
`;

export const GroupTagText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const GroupDescContainer = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  padding: 20px;
  border-radius: 10px;
  margin-top: 15px;
`;

export const GroupDescTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 18px;
  margin: 10px 0;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const GroupDesc = styled.Text`
  font-size: 15px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const ParticipantsInfosContainer = styled.View`
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ParticipantsContainer = styled.View``;

export const ParticipantsNumber = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
`;

export const ParticipantsTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  text-align: center;
  margin-top: -5px;
  color: ${(props) => props.theme.colors.black};
`;

export const AdBannerWrapper = styled.View`
  margin: 10px 0px;
`
