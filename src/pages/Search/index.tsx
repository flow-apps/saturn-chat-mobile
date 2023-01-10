import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";

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
} from "./styles";
import { useTheme } from "styled-components";
import { Keyboard, TouchableWithoutFeedback, FlatList } from "react-native";
import { GroupData } from "../../../@types/interfaces";
import api from "../../services/api";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import analytics from "@react-native-firebase/analytics";
import { MotiView } from "@motify/components";
import { StackNavigationProp } from "@react-navigation/stack";

const Search: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [loadedAll, setLoadedAll] = useState(false);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [query, setQuery] = useState("");

  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const setQuerySearch = useCallback((text) => {
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
    const response = await api.get(`/groups/search?q=${query}`);

    if (response.status === 200) {
      setGroups(response.data);
    }

    setLoading(false);
  }, [query]);

  const fetchMoreGroups = useCallback(async () => {
    setLoading(true);
    const response = await api.get(
      `/groups/search?q=${query}&_page=${page}&_limit=20`
    );

    if (response.data.length === 0) {
      setLoadedAll(true);
      setLoading(false);
      return;
    }

    if (page === 0) {
      setGroups(response.data);
    } else {
      setGroups((old) => [...old, ...response.data]);
    }
    setLoading(false);
  }, [page]);

  async function reachEnd(distance: number) {
    if (distance < 1 || loadedAll) return;

    if (!loading) {
      setPage((old) => old + 1);
      await fetchMoreGroups();
    }
  }

  async function handleGoGroupInfos(id: string) {
    navigation.navigate("GroupInfos", {
      id,
    });
  }

  return (
    <>
      <Header title="Explorar" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <SearchContainer>
            <InputContainer>
              <Input
                value={query}
                onChangeText={setQuerySearch}
                placeholder="O que procura hoje?"
                returnKeyType="search"
                onEndEditing={handleSearch}
                selectionColor={colors.secondary}
                placeholderTextColor={colors.dark_gray}
              />
              <ButtonSearch onPress={handleSearch}>
                <Feather name="search" size={25} color={"#fff"} />
              </ButtonSearch>
            </InputContainer>
          </SearchContainer>
          <ResultsContainer>
            <FlatList
              removeClippedSubviews
              data={groups}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <NoResultsContainer>
                  <NoResultAnimation
                    autoPlay
                    loop
                    speed={0.5}
                    source={require("../../assets/search.json")}
                  />
                  <NoResultText>
                    {loading
                      ? "Buscando grupos..."
                      : "Sem resultados no momento"}
                  </NoResultText>
                  <NoResultSubText>
                    {loading
                      ? "Isso pode demorar um pouco"
                      : "Tente buscar o nome de algum grupo"}
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
                  <GroupCard onPress={() => handleGoGroupInfos(item.id)}>
                    <GroupImage uri={item.group_avatar?.url} />
                    <GroupInfosContainer>
                      <GroupName numberOfLines={2}>{item.name}</GroupName>
                      <GroupDesc numberOfLines={3}>
                        {item.description}
                      </GroupDesc>
                      <GroupParticipantsText>
                        {item?.participantsAmount} participantes
                      </GroupParticipantsText>
                    </GroupInfosContainer>
                  </GroupCard>
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
