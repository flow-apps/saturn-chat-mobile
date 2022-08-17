import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Feather from "@expo/vector-icons/Feather";
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
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendData } from "../../../../@types/interfaces";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

const InviteUsers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<FriendData[]>([]);
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/friends");

      if (res.status === 200) {
        setFriends(res.data);
      }

      setLoading(false);
    })();
  }, []);

  const handleGoCreateNewInvite = () =>
    navigation.navigate("NewInvites", { id });

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Convidar" />
      <Container>
        <YourInviteContainer>
          <YourInviteTitle>
            <Feather name="user-plus" size={18} /> Convite do grupo
          </YourInviteTitle>
          <YourInviteSubtitle>
            Crie e gerencie todos os convites do grupo através do nosso
            gerenciador de convites
          </YourInviteSubtitle>
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
            <Feather name="user-check" size={20} /> Convide seus amigos
          </InviteFriendsTitle>
          <InviteFriendsSubtitle>
            Eles precisarão aceitar o convite antes de entrar!
          </InviteFriendsSubtitle>
        </InviteFriendsContainer>
        <FriendsListContainer>
          {friends.map((friend, index) => {
            const friendName =
              friend.received_by.id === user?.id
                ? friend.requested_by.name
                : friend.received_by.name;

            const friendId =
              friend.received_by.id === user?.id
                ? friend.requested_by.id
                : friend.received_by.id;

            return (
              <FriendContainer>
                <FriendWrapper>
                  <FriendAvatar
                    source={{
                      uri:
                        friend.received_by.id === user?.id
                          ? friend.requested_by.avatar.url
                          : friend.received_by.avatar.url,
                    }}
                  />
                  <FriendName>{friendName}</FriendName>
                </FriendWrapper>
                <FriendInviteButton>
                  <FriendInviteButtonText>Convidar</FriendInviteButtonText>
                </FriendInviteButton>
              </FriendContainer>
            );
          })}
        </FriendsListContainer>
      </Container>
    </>
  );
};

export default InviteUsers;
