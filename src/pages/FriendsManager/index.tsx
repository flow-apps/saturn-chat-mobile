import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { FriendData } from "../../../@types/interfaces";
import { useAuth } from "../../contexts/auth";
import Header from "../../components/Header";
import {
  Container,
  FriendsList,
  Friend,
  FriendInfos,
  FriendAvatarContainer,
  FriendAvatar,
  FriendName,
  UnFriendButton,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import Loading from "../../components/Loading";
import { useTheme } from "styled-components";
import Alert from "../../components/Alert";
import { getFriendAvatar, getFriendName } from "../../utils/friends";

const FriendsManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showUnfriendAlert, setShowUnfriendAlert] = useState(false);
  const [unfriend, setUnfriend] = useState<FriendData | null>(null);
  const [friends, setFriends] = useState<FriendData[]>([]);

  const { user } = useAuth();
  const { colors } = useTheme();

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

  const openUnfriendAlert = (unfriend: FriendData) => {
    setShowUnfriendAlert(true);
    setUnfriend(unfriend);
  };

  const closeUnfriendAlert = () => {
    setShowUnfriendAlert(false);
    setUnfriend(null);
  };

  const removeFriend = async () => {
    setShowUnfriendAlert(false);

    if (unfriend) {
      setLoading(true);
      const res = await api.delete(`/friends/remove/${unfriend.id}`);

      if (res.status === 200) {
        setFriends((old) => old.filter((friend) => friend.id !== unfriend.id));
        setUnfriend(null);
      }
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Alert
        visible={showUnfriendAlert}
        title="⚠️ Deseja desfazer a amizade?"
        content={`Se você remover este usuário da lista de amigos, você não poderá mais enviar e receber mensagens diretas desse usuário. Todas as mensagens entre vocês serão apagadas para ambos.`}
        okButtonText="Desfazer amizade"
        cancelButtonText="Cancelar"
        okButtonAction={removeFriend}
        cancelButtonAction={closeUnfriendAlert}
      />
      <Container>
        <Header title="Gerenciar amigos" />
        <FriendsList>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const friendName = getFriendName(user.id, item);

              return (
                <Friend>
                  <FriendInfos>
                    <FriendAvatarContainer>
                      <FriendAvatar uri={getFriendAvatar(user.id, item)} />
                    </FriendAvatarContainer>
                    <FriendName>{friendName}</FriendName>
                  </FriendInfos>
                  <UnFriendButton onPress={() => openUnfriendAlert(item)}>
                    <Feather name="user-x" size={22} color={colors.red} />
                  </UnFriendButton>
                </Friend>
              );
            }}
          />
        </FriendsList>
      </Container>
    </>
  );
};

export default FriendsManager;
