import CachedImage from "@components/CachedImage";
import { RTCView } from "@stream-io/react-native-webrtc";
import fonts from "@styles/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

interface ControlButtonProps {
  isActive?: boolean;
}

interface GridCardProps {
  totalItems: number;
}

const getCardDimensions = (totalItems: number) => {
  switch (totalItems) {
    case 1:
      return css`
        width: 100%;
        height: 100%;
      `;
    case 2:
      return css`
        width: 100%;
        height: 48.5%;
      `;
    case 3:
    case 4:
      return css`
        width: 48.5%;
        height: 48.5%;
      `;
    case 5:
    case 6:
    default:
      return css`
        width: 48.5%;
        height: 31.5%;
      `;
  }
};

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
  align-content: space-between;
`;

export const DirectCallContainer = styled.View`
  flex: 1;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FullscreenCard = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  margin: 8px;
`;

export const MiniCard = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 120px;
  height: 170px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.shape};
  border: 2px solid rgba(255, 255, 255, 0.2);
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.35;
  shadow-radius: 10px;
`;

export const ParticipantCard = styled.View<GridCardProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  ${({ totalItems }) => getCardDimensions(totalItems)}
`;

export const MoreCard = styled.TouchableOpacity<GridCardProps>`
  background-color: #29292e;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border: 1px dashed #8d8d99;

  ${({ totalItems }) => getCardDimensions(totalItems)}
`;

export const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #41414d;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImage = styled(CachedImage)`
  width: 100%;
  height: 100%;
  border-radius: 36px;
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
  background-color: #00000080;
  padding: 8px;
  border-radius: 20px;
`;

export const Name = styled.Text`
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  font-family: ${fonts["text"]};
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
    isActive ? theme.colors.primary : theme.colors.dark_gray};
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
