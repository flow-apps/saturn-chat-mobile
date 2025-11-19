import styled from "styled-components/native";
import fonts from "@styles/fonts";
import Slider from "@react-native-community/slider";

interface OptionCardProps {
  selected?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0px 15px;
`;

export const CreateInviteLinkContainer = styled.View`
  padding: 15px;
  margin: 15px 0px 25px 0px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.shape};
  border: 2px solid ${(props) => props.theme.colors.secondary};
`;

export const CreateInviteLinkTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  margin: 10px 0px;
`;

export const CreateInviteLinkSubtitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const CreateInviteLinkWrapper = styled.View`
  margin-top: 10px;
`;

export const CreateInviteLinkConfigs = styled.View`
  margin: 5px 0px 15px 0px;
`;

export const CreateInviteLinkConfig = styled.View`
  margin-top: 15px;
  flex: 1;
`;

export const CreateInviteLinkConfigInline = styled(CreateInviteLinkConfig)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export const CreateInviteLinkOptionLabel = styled.View`
  justify-content: center;
`;

export const CreateInviteLinkOptionText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;

export const CreateInviteLinkOptionScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 5px;
`;

export const CreateInviteLinkOptionCard = styled.TouchableOpacity<OptionCardProps>`
  background: ${(props) => props.theme.colors.background};
  border: ${(props) =>
    props.selected ? `1px solid ${props.theme.colors.primary}` : "none"};
  border-radius: 5px;
  padding: 10px 25px;
  margin-right: 5px;
`;

export const CreateInviteLinkOptionCardText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.heading};
`;

export const AmountUsagesSlider = styled(Slider)``;

export const YourInvitesContainer = styled.View``;

export const YourInvitesTitle = styled.Text`
  font-size: 18px;
  font-family: ${fonts.heading};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

export const YourInvitesList = styled.View``;

export const InviteContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 8px;
  padding: 15px;
`;

export const InviteLeftSide = styled.View``;

export const InviteLink = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
  font-family: ${fonts.text};
`;

export const InviteDuration = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
`;

export const InviteUsage = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.light_heading};
  margin-left: 3px;
`;

export const InviteRemoveButton = styled.TouchableOpacity`
  margin-left: auto;
`;

export const InviteRemoveText = styled.Text``;
