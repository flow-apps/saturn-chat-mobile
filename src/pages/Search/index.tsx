import React, { useCallback, useEffect, useState } from "react";
import Header from "@components/Header";
import Feather from "@expo/vector-icons/Feather";

import {
  ButtonSearch,
  Container,
  Input,
  InputContainer,
  SearchContainer,
  NoResultsContainer,
  NoResultAnimation,
  NoResultText,
  NoResultSubText,
  GroupCard,
  GroupImage,
  GroupInfosContainer,
  GroupName,
  GroupDesc,
  ResultsContainer,
  GroupParticipantsText,
  UserCard,
  UserAvatar,
} from "./styles";
import { useTheme } from "styled-components";
import { Keyboard, TouchableWithoutFeedback, FlatList } from "react-native";
import { GroupData, UserData } from "@type/interfaces";
import api from "@services/api";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import analytics from "@react-native-firebase/analytics";
import { MotiView } from "moti";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";
import HorizontalRadio from "@components/HorizontalRadio";
import PremiumName from "@components/PremiumName";

type TSearchResult = (
  | (UserData & { search_type: "user" })
  | (GroupData & { search_type: "group" })
)[];

const Search: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [loadedAll, setLoadedAll] = useState(false);
  const [results, setResults] = useState<TSearchResult>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "groups" | "users">("all");

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>(null);

  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("Search");

  const setQuerySearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query || loading) return;

    setLoading(true);
    setLoadedAll(false);
    setPage(0);

    await analytics().logEvent("search", {
      search_term: query,
    });
    await api
      .get(`/explorer/search/${query}?_page=${page}&_limit=30&filter=${filter}`)
      .then((response) => {
        if (response.status === 200) {
          setResults(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, filter, query]);

  const fetchMoreGroups = useCallback(async () => {
    setLoading(true);
    const response = await api
      .get(`/explorer/search/${query}?_page=${page}&_limit=30&filter=${filter}`)
      .finally(() => {
        setLoading(false);
      });

    if (response.data.length === 0) {
      setLoadedAll(true);
      return;
    }

    if (page === 0) {
      setResults(response.data);
    } else {
      setResults((old) => [...old, ...response.data]);
    }
  }, [page, filter, query]);

  const reachEnd = async (distance: number) => {
    if (distance < 1 || loadedAll) return;

    if (!loading) {
      setPage((old) => old + 1);
      await fetchMoreGroups();
    }
  };

  const handleGoGroupInfos = async (id: string) => {
    navigation.navigate("GroupInfos", {
      id,
    });
  };

  const handleGoUserProfile = async (id: string) => {
    navigation.navigate("UserProfile", {
      id,
    });
  };

  useEffect(() => {
    handleSearch();
  }, [filter]);

  useEffect(() => {
    if (!query.length || loading) return;

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleSearch();
      setSearchTimeout(null);
    }, 650);

    setSearchTimeout(newTimeout);
  }, [query]);

  return (
    <>
      <Header title={t("header_title")} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ResultsContainer>
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <SearchContainer>
                  <InputContainer>
                    <Input
                      value={query}
                      onChangeText={setQuerySearch}
                      placeholder={t("input_placeholder")}
                      textContentType="name"
                      returnKeyType="search"
                      onEndEditing={handleSearch}
                      selectionColor={colors.secondary}
                      placeholderTextColor={colors.dark_gray}
                    />
                  </InputContainer>
                  <HorizontalRadio
                    buttons={[
                      { key: t("filters.all"), value: "all" },
                      { key: t("filters.groups"), value: "groups" },
                      { key: t("filters.users"), value: "users" },
                    ]}
                    currentValue={filter}
                    onChangeValue={(newValue) => setFilter(newValue)}
                  />
                </SearchContainer>
              }
              ListEmptyComponent={
                <NoResultsContainer>
                  <NoResultAnimation
                    autoPlay
                    loop
                    speed={0.5}
                    source={require("@assets/search.json")}
                  />
                  <NoResultText>
                    {loading ? t("loading.title") : t("title")}
                  </NoResultText>
                  <NoResultSubText>
                    {loading ? t("loading.subtitle") : t("subtitle")}
                  </NoResultSubText>
                </NoResultsContainer>
              }
              ListFooterComponent={
                loading && !loadedAll ? (
                  <ActivityIndicator
                    style={{ margin: 15 }}
                    size="large"
                    color={colors.primary}
                  />
                ) : (
                  <></>
                )
              }
              onEndReachedThreshold={0.3}
              scrollEventThrottle={20}
              onEndReached={({ distanceFromEnd }) => reachEnd(distanceFromEnd)}
              renderItem={({ item }) => (
                <MotiView
                  from={{
                    opacity: 0,
                    translateX: 20,
                  }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                  }}
                  transition={{
                    type: "timing",
                    duration: 500,
                  }}
                >
                  {item.search_type === "group" ? (
                    <GroupCard onPress={() => handleGoGroupInfos(item.id)}>
                      <GroupImage uri={item.group_avatar?.url} />
                      <GroupInfosContainer>
                        <GroupName numberOfLines={2}>{item.name}</GroupName>
                        <GroupDesc numberOfLines={3}>
                          {item.description}
                        </GroupDesc>
                        <GroupParticipantsText>
                          {item?.participantsAmount}{" "}
                          {t("participants", {
                            count: item?.participantsAmount,
                          })}
                        </GroupParticipantsText>
                      </GroupInfosContainer>
                    </GroupCard>
                  ) : (
                    <UserCard onPress={() => handleGoUserProfile(item.id)}>
                      <UserAvatar uri={item?.avatar?.url} />
                      <PremiumName
                        name={item.name}
                        nickname={item?.nickname}
                        hasPremium={item.isPremium}
                        showNickname
                      />
                    </UserCard>
                  )}
                </MotiView>
              )}
            />
          </ResultsContainer>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Search;
