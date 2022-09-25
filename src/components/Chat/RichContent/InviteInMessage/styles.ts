import styled from "styled-components/native";
import fonts from "../../../../styles/fonts";
import CachedImage from "../../../CachedImage";
import { lighten } from "polished";
import { RectButton } from "react-native-gesture-handler";
import AnimatedLottieView from "lottie-react-native";

export const Container = styled.View`
  background-color: ${(props) => lighten(0.08, props.theme.colors.shape)};
  padding: 12px;
  border-radius: 12px;
  width: 85%;
  margin-top: 5px;
  min-height: 80px;
`;

export const LottieAnimationContainer = styled.View`
  width: 50px;
  height: 50px;
`;

export const LottieAnimation = styled(AnimatedLottieView)`
`;

export const InviteTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const GroupContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GroupRightSideContainer = styled.View``;

export const GroupLeftSideContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const GroupAvatar = styled(CachedImage)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const GroupInfosContainer = styled.View`
  flex: 1;
`;

export const GroupName = styled.Text`
  font-family: ${fonts["text-bold"]};
  flex: 1;
  color: ${(props) => props.theme.colors.black};
`;

export const GroupDescription = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  flex: 1;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const AcceptInviteButton = styled(RectButton)`
  background-color: ${(props) =>
    props.enabled
      ? props.theme.colors.secondary
      : props.theme.colors.dark_heading};
  padding: 3px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const AcceptInviteText = styled.Text`
  text-align: center;
  color: #fff;
  font-family: ${fonts.text};
  font-size: 12px;
  margin-top: 5px;
`;
