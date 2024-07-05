import React, { useCallback, useState } from "react";
import Header from "@components/Header";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  EmptyListContainer,
  EmptyListTitle,
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
import Loading from "@components/Loading";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendData, InviteData } from "@type/interfaces";
import { useAuth } from "@contexts/auth";
import api from "@services/api";

import sortBy from "lodash/sortBy";
import SimpleToast from "react-native-simple-toast";
import { getFriendAvatar, getFriendID, getFriendName } from "@utils/friends";
import { FlatList } from "react-native";
import { useTranslate } from "@hooks/useTranslate";

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
  const { t } = useTranslate("InviteUsers");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get(`/friends/groups/invite?group_id=${id}`);

        if (res.status === 200) {
          const data = res.data as Friend[];
          const sorted = sortBy(data, { invited: false });

          setRequests(sorted);
        }

        setLoading(false);
      })();
    }, [])
  );

  const handleGoCreateNewInvite = () =>
    navigation.navigate("NewInvites", { id });

  const handleInviteFriend = async (user_id: string) => {
    await api
      .post(`/friends/groups/invite?user_id=${user_id}&group_id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          const invite = res.data as InviteData;
          const newFriendsList = requests.map((friend) => {
            if (invite.friend_id === friend.id) {
              friend.invited = true;
            }
            return friend;
          });

          setRequests(newFriendsList);
          SimpleToast.show(t("toasts.success"));
        }
      })
      .catch((err) => {
        console.log(err);
        SimpleToast.show(t("toasts.error"));
      });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <FriendsListContainer>
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <EmptyListContainer>
                <EmptyListTitle>{t("empty_title")}</EmptyListTitle>
              </EmptyListContainer>
            )}
            ListHeaderComponent={() => (
              <>
                <YourInviteContainer>
                  <YourInviteTitle>
                    <Feather name="user-plus" size={18} /> {t("title")}
                  </YourInviteTitle>
                  <YourInviteSubtitle>{t("subtitle")}</YourInviteSubtitle>
                  <NewInviteContainer>
                    <NewInviteButton onPress={handleGoCreateNewInvite}>
                      <NewInviteButtonText>
                        <Feather name="plus" size={16} /> {t("new_invite_text")}
                      </NewInviteButtonText>
                    </NewInviteButton>
                  </NewInviteContainer>
                </YourInviteContainer>
                <InviteFriendsContainer>
                  <InviteFriendsTitle>
                    <Feather name="user-check" size={20} />{" "}
                    {t("friends_invite_title")}
                  </InviteFriendsTitle>
                  <InviteFriendsSubtitle>
                    {t("friends_invite_subtitle")}
                  </InviteFriendsSubtitle>
                </InviteFriendsContainer>
              </>
            )}
            renderItem={({ item }) => {
              const friendName = getFriendName(user.id, item);
              const friendId = getFriendID(user.id, item);

              return (
                <FriendContainer>
                  <FriendWrapper>
                    <FriendAvatar uri={getFriendAvatar(user.id, item)} />
                    <FriendName>{friendName}</FriendName>
                  </FriendWrapper>
                  <FriendInviteButton
                    onPress={() => handleInviteFriend(friendId)}
                    disabled={item.invited}
                  >
                    <FriendInviteButtonText>
                      {t(item.invited ? "invited" : "invite")}
                    </FriendInviteButtonText>
                  </FriendInviteButton>
                </FriendContainer>
              );
            }}
          />
        </FriendsListContainer>
      </Container>
    </>
  );
};

export default InviteUsers;
