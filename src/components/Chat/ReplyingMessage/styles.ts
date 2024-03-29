import darken from "polished/lib/color/darken";
import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.View`
  border-left-width: 2px;
  border-color: ${props => props.theme.colors.light_primary};
  padding: 12px 5px 12px 20px;
  width: 85%;
  background-color: ${props => darken(0.03, props.theme.colors.shape)};
  margin: 10px 0px 7px 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  elevation: 0.5;
`;

export const ReplyingTitleContainer = styled.View``

export const ReplyingTitle = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  color: ${props => props.theme.colors.dark_heading};
`

export const ReplyingMessageWrapper = styled.View``

export const ReplyingMessageAuthorWrapper = styled.View``

export const ReplyingMessageAuthorName = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.secondary};
`

export const ReplyingMessageContentContainer = styled.View`
  margin-top: 10px;
`

export const ReplyingMessageContent = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${props => props.theme.colors.black};
`

export const ReadMoreButton = styled.TouchableOpacity``

export const ReadMoreText = styled.Text`
  color: ${props => props.theme.colors.dark_gray}
`
