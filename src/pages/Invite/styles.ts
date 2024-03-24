import { LinearGradient } from "expo-linear-gradient";
import AnimatedLottieView from "lottie-react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import CachedImage from "../../components/CachedImage";
import fonts from "@styles/fonts";

export const Container = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
`;

export const InviteContainer = styled.View`
  width: 100%;
  max-width: 500px;
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 12px;
  padding: 15px;
`;

export const InviteTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
  margin: 15px 0;
`;

export const InviteAnimationContainer = styled.View`
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

export const InviteAnimation = styled(AnimatedLottieView)``;

export const InviteInvalidReason = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.text};
`;

export const InviteAvatarImage = styled(CachedImage)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: ${120 / 2}px;
`;

export const InviteGroupName = styled.Text`
  text-align: center;
  font-family: ${fonts.heading};
  font-size: 18px;
  color: ${(props) => props.theme.colors.black};
  margin: 10px 0 15px 0;
`;

export const ParticipantsContainer = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.dark_heading};
  margin: 0 auto 10px auto;
  padding: 8px;
`;

export const AcceptInviteButton = styled(RectButton)`
  background-color: ${(props) =>
    props.enabled
      ? props.theme.colors.primary
      : props.theme.colors.dark_heading};
  padding: 8px;
  border-radius: 8px;
`;

export const AcceptInviteText = styled.Text`
  text-align: center;
  color: #fff;
  font-family: ${fonts.text};
  margin-top: 5px;
`;
