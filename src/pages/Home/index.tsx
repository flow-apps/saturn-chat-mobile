import React, { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import { MotiView } from "moti";
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
  GroupHasMessage,
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
  const navigation = useNavigation<StackNavigationProp<any>>();
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
      const groupsData = groups.data as GroupData[];
      const sortedGroups = groupsData.sort((a, b) => {
        const aAmount = Number(a?.unreadMessagesAmount);
        const bAmount = Number(b?.unreadMessagesAmount);

        if (aAmount > bAmount) {
          return -1;
        } else if (aAmount < bAmount) {
          return 1;
        } else {
          return 0;
        }
      });

      setGroups(sortedGroups);
      setGroupsCount(groups.data.length);
    }
    setLoading(false);
  }, []);

  const handleGoSearch = () => navigation.navigate("Search");

  const handleGoUserProfile = () => navigation.navigate("UserProfile");

  const handleGoInvitesManager = () => navigation.navigate("InvitesManager");

  const handleGoChat = useCallback(async (id: string) => {
    navigation.navigate("Chat", { id });
  }, []);

  const handleGoNewGroup = () => navigation.navigate("NewGroup");

  if (loading) return <Loading />;
  return (
    <Container>
      <Header title="Grupos" backButton={false}>
        <>
          <HeaderButton onPress={handleGoSearch}>
            <Feather name="search" size={22} color="#fff" />
          </HeaderButton>
          <HeaderButton onPress={handleGoInvitesManager}>
            <Feather name="mail" size={22} color="#fff" />
          </HeaderButton>
          <HeaderButton onPress={handleGoUserProfile}>
            <Feather name="user" size={22} color="#fff" />
          </HeaderButton>
        </>
      </Header>
      <QuickAccessGroupsContainer
        from={{
          opacity: 0.5,
          translateY: 100,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 800,
        }}
      >
        <QuickAccessTitle>Acesso rápido</QuickAccessTitle>
        <QuickAccessGroupsScroll>
          <FlatList
            horizontal
            ListHeaderComponent={() => (
              <MotiView
                from={{
                  rotate: "90deg",
                }}
                animate={{
                  rotate: "0deg",
                }}
                transition={{
                  type: "timing",
                  duration: 1000,
                  delay: 800,
                }}
              >
                <NewGroupButton onPress={handleGoNewGroup}>
                  <Feather name="plus" size={35} color={colors.secondary} />
                </NewGroupButton>
              </MotiView>
            )}
            showsHorizontalScrollIndicator={false}
            data={groups}
            initialNumToRender={10}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <GroupButton
                activeOpacity={0.5}
                onPress={() => handleGoChat(item.id)}
              >
                <GroupImage uri={item.group_avatar?.url} />
                {Number(item?.unreadMessagesAmount) > 0 && <GroupHasMessage />}
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
                  {index > 0 && index % 5 === 0 ? <Banner /> : <></>}
                </>
              );
            }}
          />
        </GroupsList>
      </GroupsContainer>
    </Container>
  );
};

export default Home;
