import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';
import CachedImage from '../../CachedImage';

export const FriendRequestContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FriendRequestLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const FriendRequestAvatar = styled(CachedImage)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
`;

export const FriendRequestName = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  margin-left: 10px;
  color: ${(props) => props.theme.colors.black};
  flex: 1;
`;

export const FriendRequestRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const FriendRequestActionButton = styled.TouchableOpacity`
  margin-left: 15px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 5px;
  border-radius: 20px;
`;
