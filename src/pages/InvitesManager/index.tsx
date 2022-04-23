import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { FriendData } from "../../../@types/interfaces";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import api from "../../services/api";
import {
  Container,
  PresentationContainer,
  PresentationTitle,
  PresentationSubtitle,
  FriendRequestContainer,
  FriendRequestLeftContainer,
  FriendRequestRightContainer,
  FriendRequestName,
  FriendRequestAvatar,
  FriendRequestActionButton,
  EmptyListContainer,
  EmptyListTitle,
} from "./styles";
import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SimpleToast from "react-native-simple-toast";

const InvitesManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState<FriendData[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get("/friends/requests");

        if (res.status === 200) {
          setFriendRequests(res.data);
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

      const newFriendRequests = friendRequests.filter(
        (friend) => friend.id !== friendId
      );

      setFriendRequests(newFriendRequests);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Convites e solicitações" />
      <Container>
        <FlatList
          data={friendRequests}
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
                Não há convites nem solicitações de amizade. Volte mais tarde.
              </EmptyListTitle>
            </EmptyListContainer>
          )}
          renderItem={({ item }) => {
            return (
              <FriendRequestContainer
                onPress={() => OpenUserProfile(item.requested_by.id)}
              >
                <FriendRequestLeftContainer>
                  <FriendRequestAvatar
                    source={{ uri: item.requested_by.avatar.url }}
                  />
                  <FriendRequestName>
                    {item.requested_by.name}
                  </FriendRequestName>
                </FriendRequestLeftContainer>
                <FriendRequestRightContainer>
                  <FriendRequestActionButton
                    onPress={() =>
                      handleAcceptOrRejectFriend(item.id, "ACCEPT")
                    }
                  >
                    <Feather name="check" size={24} color={colors.primary} />
                  </FriendRequestActionButton>
                  <FriendRequestActionButton
                    onPress={() =>
                      handleAcceptOrRejectFriend(item.id, "REJECT")
                    }
                  >
                    <Feather name="x" size={24} color={colors.red} />
                  </FriendRequestActionButton>
                </FriendRequestRightContainer>
              </FriendRequestContainer>
            );
          }}
        />
      </Container>
    </>
  );
};

export default InvitesManager;
