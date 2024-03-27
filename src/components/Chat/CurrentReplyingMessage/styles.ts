import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const ReplyingMessageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
  height: 100%;
`;

export const ReplyingMessageContentContainer = styled.View``;

export const ReplyingMessageRemoveContainer = styled.View`
  min-height: 50px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
`;

export const ReplyingMessageRemoveButton = styled.TouchableOpacity``;

export const ReplyingMessageTitleWrapper = styled.View``;

export const ReplyingMessageTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ReplyingMessageAuthorNameWrapper = styled.View`
  margin-top: 3px;
`;

export const ReplyingMessageAuthorName = styled.Text`
  font-family: ${fonts["text-bold"]};
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondary};
  margin: 0px 0px 5px 0px;
`;

export const ReplyingMessageWrapper = styled.View`
  width: 100%;
`;

export const ReplyingMessage = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
`;