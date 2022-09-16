import styled from 'styled-components/native';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.Modal`
  position: relative;
`;

export const YouTubeModal = styled.View`
  background-color: #000000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const YouTubeModalHeader = styled.View`
  width: 100%;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.light_primary};
  padding-top: ${getStatusBarHeight() + 10}px;
`;

export const YouTubeModalHeaderButton = styled.TouchableOpacity`
  margin: 0 5px;
`;
