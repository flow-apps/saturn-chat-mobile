import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { GroupData, UserData } from "../../../@types/interfaces";
import Group from "../../components/Group";
import Header from "../../components/Header";
import { HeaderButton } from "../../components/Header/styles";
import Loading from "../../components/Loading";
import api from "../../services/api";
import {
  Container,
  GroupButton,
  GroupImage,
  GroupsContainer,
  GroupsList,
  GroupsSubtitle,
  GroupsTitle,
  NewGroupButton,
  QuickAccessGroupsContainer,
  QuickAccessGroupsScroll,
  QuickAccessTitle,
  TitleWrapper,
} from "./styles";

export interface ParticipantData {
  id: string;
  user_id: string;
  group_id: string;
  participating_since: string;
  user: UserData;
  group: GroupData;
}

const Home: React.FC = () => {
  const [groups, setGroups] = useState<ParticipantData[]>([]);
  const [groupsCount, setGroupsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      async function fetchGroups() {
        await loadGroups();
      }

      fetchGroups();
    }, [])
  );

  const loadGroups = useCallback(async () => {
    setLoading(true);
    const groups = await api.get("/groups/list");

    if (groups.status === 200) {
      setGroups(groups.data);
      setGroupsCount(groups.data.length);
    }
    setLoading(false);
  }, []);

  const handleGoSearch = () => navigation.navigate("Search");

  const handleGoUserProfile = () => navigation.navigate("UserProfile");

  const handleGoChat = useCallback(
    (id: string) => navigation.navigate("Chat", { id }),
    []
  );

  const handleGoNewGroup = () => navigation.navigate("NewGroup");

  if (loading) return <Loading />;
  return (
    <Container>
      <Header title="Grupos" backButton={false}>
        <>
          <HeaderButton onPress={handleGoSearch}>
            <Feather name="search" size={22} color="#fff" />
          </HeaderButton>
          <HeaderButton onPress={handleGoUserProfile}>
            <Feather name="user" size={22} color="#fff" />
          </HeaderButton>
        </>
      </Header>
      <QuickAccessGroupsContainer>
        <QuickAccessTitle>Grupos</QuickAccessTitle>
        <QuickAccessGroupsScroll>
          <NewGroupButton onPress={handleGoNewGroup}>
            <Feather name="plus" size={35} color={colors.secondary} />
          </NewGroupButton>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={groups}
            initialNumToRender={5}
            removeClippedSubviews
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <GroupButton
                activeOpacity={0.5}
                onPress={() => handleGoChat(item.group.id)}
              >
                <GroupImage
                  source={{
                    uri: item.group.group_avatar && item.group.group_avatar.url,
                  }}
                />
              </GroupButton>
            )}
          />
        </QuickAccessGroupsScroll>
      </QuickAccessGroupsContainer>
      <GroupsContainer>
        <TitleWrapper>
          <GroupsTitle>Acesse os grupos</GroupsTitle>
          <GroupsSubtitle>Você está em {groupsCount} grupos</GroupsSubtitle>
        </TitleWrapper>
        <GroupsList>
          <FlatList
            data={groups}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Group
                name={item.group.name}
                image={item.group.group_avatar && item.group.group_avatar.url}
                unreadMessages={0}
                activeOpacity={0.5}
                onPress={() => handleGoChat(item.group.id)}
              />
            )}
          />
        </GroupsList>
      </GroupsContainer>
    </Container>
  );
};

export default Home;
