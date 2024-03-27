import styled from "styled-components/native";
import fonts from "@styles/fonts";
import lighten from "polished/lib/color/lighten";
import darken from "polished/lib/color/darken";
import CachedImage from "@components/CachedImage";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 15,
  },
})`
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
  margin-top: -80px;
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
  margin: 10px 0px;
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
    props.participating ? "#fff" : props.theme.colors.black};
`;

export const GroupTagsContainer = styled.View`
  padding: 10px;
`;

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
  background-color: ${(props) => lighten(0.08, props.theme.colors.shape)};
  padding: 12px;
  border-radius: 40px;
`;

export const GroupTagText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const GroupDescContainer = styled.View`
  background-color: ${(props) => darken(0.02, props.theme.colors.shape)};
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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const ParticipantsContainer = styled.View`
  width: 100%;
  background-color: ${(props) => darken(0.085, props.theme.colors.shape)};
  padding: 10px;
  margin-top: 10px;
`;

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
`;
