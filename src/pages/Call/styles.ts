import { RTCView } from "@stream-io/react-native-webrtc";
import fonts from "@styles/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

interface ControlButtonProps {
  isActive?: boolean;
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`;

export const Header = styled.View`
  padding: 16px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-family: ${fonts["text-bold"]};
`;

export const ParticipantCount = styled.Text`
  color: #a8a8b3;
  font-size: 14px;
  margin-top: 4px;
  font-family: ${fonts["text"]};
`;

export const GridContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;
  align-content: center;
`;

export const ParticipantCard = styled.View`
  width: 48%;
  height: 31%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  margin-bottom: 4%;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Avatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #41414d;
  align-items: center;
  justify-content: center;
`;

export const AvatarText = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-family: ${fonts["text-bold"]};
`;

export const NameContainer = styled.View`
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
`;

export const Name = styled.Text`
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  font-family: ${fonts["text"]};
`;

export const MoreCard = styled.TouchableOpacity`
  width: 48%;
  height: 31%;
  background-color: #29292e;
  border-radius: 12px;
  margin-bottom: 4%;
  align-items: center;
  justify-content: center;
  border: 1px dashed #8d8d99;
`;

export const MoreText = styled.Text`
  color: #00b37e;
  font-size: 28px;
  font-family: ${fonts["text-bold"]};
`;

export const MoreSubtext = styled.Text`
  color: #c4c4cc;
  font-size: 14px;
  margin-top: 4px;
  font-family: ${fonts["text"]};
`;

export const ControlsBar = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ControlButton = styled.TouchableOpacity<ControlButtonProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.light_gray};
  align-items: center;
  justify-content: center;
`;

export const EndCallButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.red};
  align-items: center;
  justify-content: center;
`;

export const StyledRTCView = styled(RTCView)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
