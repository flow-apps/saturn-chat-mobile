import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import isNumber from "lodash/isNumber";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { FriendData } from "../../../@types/interfaces";
import Banner from "../../components/Ads/Banner";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import {
  getFriendAvatar,
  getFriendID,
  getFriendName,
} from "../../utils/friends";

import {
  AdContainer,
  Container,
  EmptyListContainer,
  EmptyListTitle,
  FriendAvatar,
  FriendContainer,
  FriendLeftContainer,
  FriendName,
  PresentationContainer,
  PresentationSubtitle,
  PresentationTitle,
  UnreadMessages,
  UnreadMessagesText,
} from "./styles";

interface OpenChatProps {
  id: string;
  name: string;
  friendId: string;
}

const Friends: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<FriendData[]>([]);

  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get("/friends");

        if (res.status === 200) {
          setFriends(res.data);
        }

        setLoading(false);
      })();
    }, [])
  );

  const handleOpenChat = ({ id, name, friendId }: OpenChatProps) => {
    navigation.navigate("Chat", { id, name, friendId });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Amigos" backButton={false} />
      <Container>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <PresentationContainer>
              <PresentationTitle>Mensagens diretas</PresentationTitle>
              <PresentationSubtitle>
                Envie mensagens privadas aos seus amigos. Você só pode falar com
                pessoas da sua lista de amigos.
              </PresentationSubtitle>
              {
                  friends.length > 0 && (
                    <AdContainer>
                      <Banner />
                    </AdContainer>
                  )
                }
            </PresentationContainer>
          )}
          ListEmptyComponent={() => (
            <EmptyListContainer>
              <EmptyListTitle>
                Você não possui nenhum amigo. Adicione novos amigos.
              </EmptyListTitle>
            </EmptyListContainer>
          )}
          renderItem={({ item }) => {
            const friendName = getFriendName(user.id, item);
            const friendId = getFriendID(user.id, item);

            return (
              <FriendContainer
                onPress={() =>
                  handleOpenChat({
                    id: item.chat.id,
                    name: friendName,
                    friendId,
                  })
                }
              >
                <FriendLeftContainer>
                  <FriendAvatar uri={getFriendAvatar(user.id, item)} />
                  <FriendName>{friendName}</FriendName>
                </FriendLeftContainer>
                {isNumber(item?.unreadMessagesAmount) &&
                  item?.unreadMessagesAmount > 0 && (
                    <UnreadMessages>
                      <UnreadMessagesText>
                        {item.unreadMessagesAmount > 99
                          ? "99+"
                          : `${item.unreadMessagesAmount}`}
                      </UnreadMessagesText>
                    </UnreadMessages>
                  )}
              </FriendContainer>
            );
          }}
        />
      </Container>
    </>
  );
};

export default Friends;
