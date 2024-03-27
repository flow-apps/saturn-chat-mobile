import styled from 'styled-components/native';
import fonts from '@styles/fonts';
import CachedImage from '../../CachedImage';

export const GroupInviteContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupInviteLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const GroupInviteAvatar = styled(CachedImage)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;

export const GroupInviteInfosWrapper = styled.View`
  flex: 1;
`;

export const GroupInviteName = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  margin-left: 10px;
  color: ${(props) => props.theme.colors.black};
`;

export const GroupInviteParticipantsAmount = styled.Text`
  margin-left: 10px;
  margin-top: -3px;
  color: ${props => props.theme.colors.dark_heading};
  font-family: ${fonts.text};
  font-size: 12px;
`

export const GroupInviteRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const GroupInviteActionButton = styled.TouchableOpacity`
  margin-left: 15px;
  padding: 5px 8px;
  border-radius: 8px;
`;

export const GroupInviteActionButtonText = styled.Text<{ color: string }>`
  font-size: 12px;
  font-family: ${fonts['text-bold']};
  color: ${props => props.color};
`; 
