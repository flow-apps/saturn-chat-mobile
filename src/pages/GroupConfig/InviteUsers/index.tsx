import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
  YourInviteSubtitle,
  YourInviteTitle,
} from "./styles";
import Loading from "../../../components/Loading";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendData, InviteData } from "../../../../@types/interfaces";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import _ from "lodash";
import SimpleToast from "react-native-simple-toast";
import { getFriendAvatar, getFriendID, getFriendName } from "../../../utils/friends";

interface Friend extends FriendData {
  invited: boolean;
}

const InviteUsers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Friend[]>([]);
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id } = route.params as { id: string };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get(`/friends/groups/invite?group_id=${id}`);

        if (res.status === 200) {
          const data = res.data as Friend[];
          const sorted = _.sortBy(data, { invited: false });

          setRequests(sorted);
        }

        setLoading(false);
      })();
    }, [])
  );

  const handleGoCreateNewInvite = () =>
    navigation.navigate("NewInvites", { id });

  const handleInviteFriend = async (user_id: string) => {
    const res = await api.post(
      `/friends/groups/invite?user_id=${user_id}&group_id=${id}`
    );

    if (res.status === 200) {
      const invite = res.data as InviteData;
      const newFriendsList = requests.map((friend) => {
        if (invite.friend_id === friend.id) {
          friend.invited = true;
        }
        return friend;
      });

      setRequests(newFriendsList);
      SimpleToast.show("Convite enviado com sucesso!");
    } else {
      SimpleToast.show("Não foi possível convidar seu amigo!");
    }
  };

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
            Somente amigos que não estão no grupo aparecem aqui. Eles precisarão
            aceitar o convite para entrar.
          </InviteFriendsSubtitle>
        </InviteFriendsContainer>
        <FriendsListContainer>
          {requests.map((friend, index) => {
            const friendName = getFriendName(user.id, friend);
            const friendId = getFriendID(user.id, friend);

            return (
              <FriendContainer key={index}>
                <FriendWrapper>
                  <FriendAvatar
                    source={{
                      uri: getFriendAvatar(user.id, friend),
                    }}
                  />
                  <FriendName>{friendName}</FriendName>
                </FriendWrapper>
                <FriendInviteButton
                  onPress={() => handleInviteFriend(friendId)}
                  disabled={friend.invited}
                >
                  <FriendInviteButtonText>
                    {friend.invited ? "Convidado" : "Convidar"}
                  </FriendInviteButtonText>
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
