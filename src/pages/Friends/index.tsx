import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import isNumber from "lodash/isNumber";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { FriendData } from "@type/interfaces";
import Banner from "@components/Ads/Banner";
import Header from "@components/Header";
import Loading from "@components/Loading";
import { useAuth } from "@contexts/auth";
import api from "@services/api";
import {
  getFriendAvatar,
  getFriendID,
  getFriendName,
  getFriendPremium,
} from "@utils/friends";

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
import { useTranslate } from "@hooks/useTranslate";
import PremiumName from "@components/PremiumName";
import fonts from "@styles/fonts";
import { useTheme } from "styled-components";

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
  const { t } = useTranslate("Friends");
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

  const handleOpenChat = ({ id, name, friendId }: OpenChatProps) => {
    navigation.navigate("Chat", { id, name, friendId });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={t("header_title")} backButton={false} />
      <Container>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <PresentationContainer>
              <PresentationTitle>{t("title")}</PresentationTitle>
              <PresentationSubtitle>{t("subtitle")}</PresentationSubtitle>
              {friends.length > 0 && (
                <AdContainer>
                  <Banner />
                </AdContainer>
              )}
            </PresentationContainer>
          )}
          ListEmptyComponent={() => (
            <EmptyListContainer>
              <EmptyListTitle>{t("empty_list_text")}</EmptyListTitle>
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
                  <PremiumName
                    name={friendName}
                    hasPremium={getFriendPremium(user.id, item)}
                    fontFamily="text"
                    nameSize={17}
                    color={colors.dark_heading}
                  />
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
