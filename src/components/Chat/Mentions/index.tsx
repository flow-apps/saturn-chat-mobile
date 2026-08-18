import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import api from "@services/api";
import { UserData } from "@type/interfaces";
import { MentionsProps, MentionUser } from "./types";
import {
  Container,
  UserContainer,
  Avatar,
  Nickname,
  NoResultsText,
} from "./styles";
import { useAuth } from "@contexts/auth";
import { useTheme } from "styled-components";

const Mentions: React.FC<MentionsProps> = ({
  query,
  groupId,
  onUserSelect,
}) => {
  const [users, setUsers] = useState<MentionUser[]>([]);
  const { getHeadersForAuthFiles } = useAuth();
  const { colors } = useTheme()

  useEffect(() => {
    if (query) {
      api
        .get(`/users/search?q=${query}&group_id=${groupId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUsers([]);
    }
  }, [query, groupId]);

  const renderItem = ({ item }: { item: MentionUser }) => (
    <UserContainer onPress={() => onUserSelect(item)}>
      <Avatar
        uri={item.avatar ? item.avatar.url : ""}
        placeholder={require("@assets/avatar-placeholder.jpg")}
      />
      <Nickname>{item.nickname}</Nickname>
    </UserContainer>
  );

  return (
    <FlatList
      data={users}
      ListEmptyComponent={() => (
        <NoResultsText>Nenhum usuário encontrado</NoResultsText>
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: colors.shape,
        borderRadius: 8,
        padding: 8,
        marginTop: 10
      }}
    />
  );
};

export default Mentions;
