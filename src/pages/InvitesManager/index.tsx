import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { FriendData, InviteData } from "../../../@types/interfaces";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import api from "../../services/api";
import {
  Container,
  PresentationContainer,
  PresentationTitle,
  PresentationSubtitle,
  EmptyListContainer,
  EmptyListTitle,
} from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SimpleToast from "react-native-simple-toast";
import FriendRequest from "../../components/InvitesManager/FriendRequest";
import { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import GroupInvite from "../../components/InvitesManager/GroupInvite";

interface Request extends FriendData, InviteData {
  type: "FRIEND_REQUEST" | "GROUP_INVITE";
}

const InvitesManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get("/invites/requests");
        const data = res.data;

        if (res.status === 200) {
          const sorted = _.orderBy(data, ["created_at"], "desc");
          setRequests(sorted);
        }

        setLoading(false);
      })();
    }, [])
  );

  const OpenUserProfile = (id: string) => {
    navigation.navigate("UserProfile", { id });
  };

  const handleAcceptOrRejectFriend = async (
    friendId: string,
    action: "ACCEPT" | "REJECT"
  ) => {
    const res = await api.put(
      `/friends/response?state=${action}&friend_id=${friendId}`
    );

    if (res.status === 200) {
      SimpleToast.show(
        action === "ACCEPT"
          ? "Amigo aceito com sucesso!"
          : "Amigo rejeitado com sucesso!"
      );

      const newRequests = requests.filter((friend) => friend.id !== friendId);

      setRequests(newRequests);
    }
  };

  const handleAcceptOrRejectInvite = async (
    inviteID: string,
    action: "ACCEPT" | "REJECT"
  ) => {
    if (action === "ACCEPT") {
      const res = await api.get(`/inv/join/${inviteID}`);

      if (res.status === 200) {
        SimpleToast.show("Convite aceito!");
      }
    } else {
      const res = await api.delete(`/invites/${inviteID}`);

      if (res.status === 204) {
        SimpleToast.show("Convite recusado!");
      }
    }

    const filteredRequests = requests.filter(
      (request) => request.id !== inviteID
    );
    setRequests(filteredRequests);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Convites e solicitações" />
      <Container>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <PresentationContainer>
              <PresentationTitle>Convites e solicitações</PresentationTitle>
              <PresentationSubtitle>
                Gerencie seus convites e solicitações de amizade que você
                recebeu.
              </PresentationSubtitle>
            </PresentationContainer>
          )}
          ListEmptyComponent={() => (
            <EmptyListContainer>
              <EmptyListTitle>
                Não há convites para grupos nem solicitações de amizade. Volte mais tarde.
              </EmptyListTitle>
            </EmptyListContainer>
          )}
          renderItem={({ item }) => {
            return item.type === "FRIEND_REQUEST" ? (
              <FriendRequest
                friend={item}
                OpenUserProfile={OpenUserProfile}
                handleAcceptOrRejectFriend={handleAcceptOrRejectFriend}
              />
            ) : (
              <GroupInvite
                invite={item}
                OpenGroupProfile={() => {}}
                handleAcceptOrRejectInvite={handleAcceptOrRejectInvite}
              />
            );
          }}
        />
      </Container>
    </>
  );
};

export default InvitesManager;
