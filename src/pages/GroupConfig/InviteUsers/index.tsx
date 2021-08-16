import React from "react";
import Header from "../../../components/Header";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  FriendAvatar,
  FriendContainer,
  FriendInviteButton,
  FriendInviteButtonText,
  FriendName,
  FriendsListContainer,
  FriendWrapper,
  InviteFriendsContainer,
  InviteFriendsSubtitle,
  InviteFriendsTitle,
  NewInviteButton,
  NewInviteButtonText,
  NewInviteContainer,
  YourInviteContainer,
  YourInviteCopyButton,
  YourInviteLinkContainer,
  YourInviteLinkText,
  YourInviteSubtitle,
  YourInviteTitle,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import config from "../../../config";

const InviteUsers: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params as { id: string }
  const { colors } = useTheme();

  const handleGoCreateNewInvite = () => navigation.navigate("NewInvites", { id })

  return (
    <>
      <Header title="Convidar" backButton />
      <Container>
        <YourInviteContainer>
          <YourInviteTitle>
            <Feather name="user-plus" size={18} /> Convite do grupo
          </YourInviteTitle>
          <YourInviteSubtitle>
            Você pode convidar usuários para o grupo usando este link:
          </YourInviteSubtitle>
          <YourInviteLinkContainer>
            <YourInviteLinkText numberOfLines={1} selectable>
              {config.WEBSITE_URL}/invite/77g8gop
            </YourInviteLinkText>
            <YourInviteCopyButton>
              <Feather name="clipboard" size={22} color={colors.secondary} />
            </YourInviteCopyButton>
          </YourInviteLinkContainer>
          <NewInviteContainer>
            <NewInviteButton onPress={handleGoCreateNewInvite}>
              <NewInviteButtonText>
                <Feather name="plus" size={16} /> Gerenciar convites
              </NewInviteButtonText>
            </NewInviteButton>
          </NewInviteContainer>
        </YourInviteContainer>
        <InviteFriendsContainer>
          <InviteFriendsTitle>
            <Feather name="user-check" size={20} /> Em breve
          </InviteFriendsTitle>
          {/* <InviteFriendsSubtitle>
            Eles precisarão aceitar o convite antes de entrar!
          </InviteFriendsSubtitle> */}
        </InviteFriendsContainer>
        <FriendsListContainer>
          {/* <FriendContainer>
            <FriendWrapper>
              <FriendAvatar source={avatar} />
              <FriendName>Pedro Henrique</FriendName>
            </FriendWrapper>
            <FriendInviteButton>
              <FriendInviteButtonText>Convidar</FriendInviteButtonText>
            </FriendInviteButton>
          </FriendContainer>
          <FriendContainer>
            <FriendWrapper>
              <FriendAvatar source={avatar} />
              <FriendName>Pedro Henrique</FriendName>
            </FriendWrapper>
            <FriendInviteButton>
              <FriendInviteButtonText>Convidar</FriendInviteButtonText>
            </FriendInviteButton>
          </FriendContainer> */}
        </FriendsListContainer>
      </Container>
    </>
  );
};

export default InviteUsers;
