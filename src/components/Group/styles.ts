import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupInfos = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const GroupImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const GroupName = styled.Text`
  font-size: 17px;
  font-family: ${fonts.text};
  margin-left: 10px;
  color: ${(props) => props.theme.colors.dark_heading};
  width: 80%;
`;

export const UnreadMessages = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

export const UnreadMessagesText = styled.Text`
  color: ${(props) => props.theme.colors.white};
`;

export const HLWrapper = styled.View`
  flex: 1;
  align-items: flex-end;
`;
