import React, { useCallback, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { MotiView } from "moti";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { GroupData, UserData } from "@type/interfaces";
import Banner from "@components/Ads/Banner";
import Group from "@components/Group";
import Header from "@components/Header";
import { HeaderButton } from "@components/Header/styles";
import Loading from "@components/Loading";
import api from "@services/api";
import {
  AdContainer,
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
  HasInvitesBullet,
  NewGroupButton,
  QuickAccessGroupsContainer,
  QuickAccessGroupsScroll,
  QuickAccessTitle,
  TitleWrapper,
} from "./styles";
import { useRemoteConfigs } from "@contexts/remoteConfigs";
import { useHome } from "@contexts/home";
import configs from "../../config";
import { useTranslate } from "@hooks/useTranslate";
import { ParticipantStates } from "@type/enums";

export interface ParticipantData {
  id: string;
  user_id: string;
  group_id: string;
  participating_since: string;
  user: UserData;
  group: GroupData;
  state: ParticipantStates;
}

const Home: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [groupsCount, setGroupsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { allConfigs } = useRemoteConfigs();
  const { colors } = useTheme();
  const { hasInvites, handleCheckInvites } = useHome();
  const { t } = useTranslate("Home");

  const navigation = useNavigation<StackNavigationProp<any>>();

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

  const handleGoOficialGroup = () => {
    if (__DEV__) {
      console.log("Em produção leva ao grupo de ID", configs.OFICIAL_GROUP_ID);

      return;
    }

    navigation.navigate("GroupInfos", {
      id: configs.OFICIAL_GROUP_ID,
    });
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchGroups() {
        await loadGroups();
      }

      handleCheckInvites();
      fetchGroups();
    }, [])
  );

  if (loading) return <Loading />;
  return (
    <Container>
      <Header title={t("header_title")} backButton={false}>
        <>
          <HeaderButton onPress={handleGoSearch}>
            <Feather name="search" size={22} color="#fff" />
          </HeaderButton>
          <HeaderButton onPress={handleGoInvitesManager}>
            <Feather name="mail" size={22} color="#fff" />
            {hasInvites && <HasInvitesBullet />}
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
        <QuickAccessTitle>{t("quick_access")}</QuickAccessTitle>
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
                  source={require("@assets/welcome.json")}
                  speed={0.5}
                  autoPlay
                  loop={false}
                />
                <GroupsListEmptyTitle>
                  {t("empty_list.title")}
                </GroupsListEmptyTitle>
                <GroupsListEmptySubTitle>
                  {t("empty_list.search_text")}{" "}
                  <Feather name="search" size={16} color={colors.secondary} />
                  {t("empty_list.line_0")}{" "}
                  <GroupsListEmptyLink onPress={handleGoOficialGroup}>
                    {t("empty_list.official_group")}
                  </GroupsListEmptyLink>
                  !
                </GroupsListEmptySubTitle>
              </GroupsListEmptyContainer>
            )}
            ListHeaderComponent={() => (
              <TitleWrapper>
                <GroupsTitle>{t("groups_list.title")}</GroupsTitle>
                <GroupsSubtitle>
                  {t("groups_list.subtitle", { count: groupsCount })}
                </GroupsSubtitle>
                {groups.length > 0 && (
                  <AdContainer>
                    <Banner />
                  </AdContainer>
                )}
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
                  {index > 0 &&
                    index % Number(allConfigs.ad_multiple_in_home) === 0 && (
                      <Banner />
                    )}
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
