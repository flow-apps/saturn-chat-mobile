import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
`;

export const ContentContainer = styled.View`
  margin: 10px 0px;
`

export const ContentTitle = styled.Text`
  font-size: 25px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.black};
`

export const ContentDescription = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.light_heading};
  margin-top: 10px;
`

export const RolesContainer = styled.View``

export const RoleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RoleLabel = styled.Text<{ color?: string }>`
  font-size: 18px;
  font-family: ${fonts['text-bold']};
  color: ${props => props.color || props.theme.colors.black};
  margin-top: 5px;
  margin-left: 10px;
`

export const RoleInfoContainer = styled.View`
  margin: 22px 0px;
`

export const RoleTitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 10px;
`;

export const RoleDescription = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.dark_heading};
`;

export const RolePermissionsContainer = styled.View`
  margin-top: 10px;
`

export const RolePermission = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.black};
`
