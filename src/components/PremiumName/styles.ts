import styled from "styled-components/native";
import { PremiumNameProps } from ".";
import fonts from "@styles/fonts";

interface EmblemProps {
  isPremium: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NameContainer = styled.View``;

export const NicknameContainer = styled.View``;

export const Name = styled.Text<PremiumNameProps>`
  font-size: ${(props) => props.nameSize || 16}px;
  font-family: ${(props) => fonts[props.fontFamily || "heading"]};

  color: ${(props) => props.color || props.theme.colors.black};
`;

export const NicknameText = styled(Name)`
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.quote};
  font-size: 14px;
  margin-top: -5px;
`;

export const EmblemContainer = styled.TouchableOpacity<EmblemProps>`
  display: ${(props) => (props.isPremium ? "flex" : "none")};
  margin-right: 5px;
`;
