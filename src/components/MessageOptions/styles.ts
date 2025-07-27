import styled from "styled-components/native";
import fonts from "@styles/fonts";
import CachedImage from "../CachedImage";
import lighten from "polished/lib/color/lighten";

interface OptionTextProps {
  color?: string;
}

export const Container = styled.Modal``;

export const MessageInfosContainer = styled.View`
  flex-direction: row;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
  align-items: center;
`;

export const MessageInfos = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const UserName = styled.Text`
  font-size: 15px;
  font-family: ${fonts["text"]};
  color: ${({ theme }) => theme.colors.black};
`;

export const MessageText = styled.Text`
  font-size: 12px;
  font-family: ${fonts["text"]};
  color: ${({ theme }) => theme.colors.light_heading};
  width: 100%;
`;

export const MessageAvatar = styled(CachedImage)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const MessageOptionsContainer = styled.View`
  flex: 1;
  background-color: #00000088;
  align-items: center;
  justify-content: center;
`;

export const MessageOptionsModal = styled.View`
  padding: 10px;
  width: 90%;
  background-color: ${({ theme }) => lighten(0.05, theme.colors.shape)};
  border-radius: 15px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

export const Option = styled.TouchableOpacity`
  padding: 12px 0;
`;

export const OptionText = styled.Text<OptionTextProps>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => (props.color ? props.color : props.theme.colors.black)};
`;
