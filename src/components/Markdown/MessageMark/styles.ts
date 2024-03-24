import styled from 'styled-components/native';
import fonts from '@styles/fonts';
import { MessageContent } from '../../Chat/Message/styles';

export const MessageCodeBlock = styled.View`
  background-color: ${(props) => props.theme.colors.light_primary};
  padding: 12px;
  border-radius: 5px;
  border: 0.5px solid #fff;
  margin: 5px 0px;
`;

export const MessageCodeBlockText = styled(MessageContent)`
  color: #fff;
  font-size: 12px;
  font-family: ${fonts.code};
`;

export const MessageCodeInline = styled(MessageContent)`
  font-family: ${fonts.code};
  background-color: ${(props) => props.theme.colors.light_primary};
  color: #fff;
`;

export const MessageLink = styled(MessageContent)`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${fonts["text-bold"]};
`;