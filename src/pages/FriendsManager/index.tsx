import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { FriendData } from "@type/interfaces";
import { useAuth } from "@contexts/auth";
import Header from "@components/Header";
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

import Feather from "@expo/vector-icons/Feather";
import api from "@services/api";
import Loading from "@components/Loading";
import { useTheme } from "styled-components";
import Alert from "@components/Alert";
import {
  getFriendAvatar,
  getFriendName,
  getFriendPremium,
} from "@utils/friends";
import { useTranslate } from "@hooks/useTranslate";
import PremiumName from "@components/PremiumName";

const FriendsManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showUnfriendAlert, setShowUnfriendAlert] = useState(false);
  const [unfriend, setUnfriend] = useState<FriendData | null>(null);
  const [friends, setFriends] = useState<FriendData[]>([]);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { t } = useTranslate("FriendsManager");

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
        title={t("alerts.unfriend.title")}
        content={t("alerts.unfriend.content")}
        okButtonText={t("alerts.unfriend.ok_text")}
        okButtonAction={removeFriend}
        cancelButtonAction={closeUnfriendAlert}
      />
      <Container>
        <Header title={t("header_title")} />
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
                    <PremiumName
                      name={friendName}
                      hasPremium={getFriendPremium(user.id, item)}
                      nameSize={14}
                      fontFamily="text"
                      color={colors.black}
                    />
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
