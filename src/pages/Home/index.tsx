import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { GroupData, UserData } from "../../../@types/interfaces";
import Banner from "../../components/Ads/Banner";
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
  GroupsListEmptyAnimation,
  GroupsListEmptyContainer,
  GroupsListEmptyLink,
  GroupsListEmptySubTitle,
  GroupsListEmptyTitle,
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
  const [groups, setGroups] = useState<GroupData[]>([]);
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
        <QuickAccessTitle>Acesso rápido</QuickAccessTitle>
        <QuickAccessGroupsScroll>
          <FlatList
            horizontal
            ListHeaderComponent={() => (
              <NewGroupButton onPress={handleGoNewGroup}>
                <Feather name="plus" size={35} color={colors.secondary} />
              </NewGroupButton>
            )}
            showsHorizontalScrollIndicator={false}
            data={groups}
            initialNumToRender={5}
            removeClippedSubviews
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <GroupButton
                activeOpacity={0.5}
                onPress={() => handleGoChat(item.id)}
              >
                <GroupImage
                  source={{
                    uri: item.group_avatar && item.group_avatar.url,
                  }}
                />
              </GroupButton>
            )}
          />
        </QuickAccessGroupsScroll>
      </QuickAccessGroupsContainer>
      <GroupsContainer>
        <GroupsList>
          <FlatList
            data={groups}
            ListEmptyComponent={() => (
              <GroupsListEmptyContainer>
                <GroupsListEmptyAnimation
                  source={require("../../assets/welcome.json")}
                  speed={0.5}
                  autoPlay
                  loop={false}
                />
                <GroupsListEmptyTitle>
                  Que tal começar entrando num grupo?
                </GroupsListEmptyTitle>
                <GroupsListEmptySubTitle>
                  Acesse a aba{" "}
                  <Feather name="search" size={16} color={colors.secondary} /> e
                  pesquise algo ou entre no nosso{" "}
                  <GroupsListEmptyLink>Grupo Oficial</GroupsListEmptyLink>!
                </GroupsListEmptySubTitle>
              </GroupsListEmptyContainer>
            )}
            ListHeaderComponent={() => (
              <TitleWrapper>
                <GroupsTitle>Acesse os grupos</GroupsTitle>
                <GroupsSubtitle>
                  Você está em {groupsCount} grupos
                </GroupsSubtitle>
                <Banner />
              </TitleWrapper>
            )}
            endFillColor={colors.shape}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => {
              return (
                <>
                  <Group
                    name={item.name}
                    image={item.group_avatar && item.group_avatar.url}
                    unreadMessages={item?.unreadMessagesAmount}
                    activeOpacity={0.5}
                    onPress={() => handleGoChat(item.id)}
                  />
                  { index > 0 && index % 5 === 0 ? (
                    <Banner />
                  ) : <></>}
                </>
              )
            }}
          />
        </GroupsList>
      </GroupsContainer>
    </Container>
  );
};

export default Home;
