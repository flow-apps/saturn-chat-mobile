import CachedImage from "@components/CachedImage";
import fonts from "@styles/fonts";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  max-height: 200px;
`;

export const UserContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const Avatar = styled(CachedImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
`;

export const Nickname = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${({ theme }) => theme.colors.black};
`;

export const NoResultsText = styled.Text`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark_gray};
  font-family: ${fonts.text};
`;
