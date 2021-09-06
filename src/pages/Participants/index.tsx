import React from "react";
import Header from "../../components/Header";
import {
  Container,
  ParticipantsContainer,
  SectionContainer,
  SectionTitle,
  ParticipantsList,
  ParticipantContainer,
  ParticipantAvatar,
  ParticipanteName,
  Participant,
  OwnerTagContainer,
  OwnerTag,
  ParticipantInfosWrapper,
  JoinedDateContainer,
  JoinedDate,
  ParticipantAvatarContainer,
  ParticipantStatus,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";
import Loading from "../../components/Loading";
import { ConvertDate } from "../../utils/convertDate";
import { useCallback } from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";
import Banner from "../../components/Ads/Banner";
import { AdBannerWrapper } from "../GroupInfos/styles";
import PremiumName from "../../components/PremiumName";
import { ParticipantsData } from "../../../@types/interfaces";
import _ from "lodash";
import { useAuth } from "../../contexts/auth";

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<ParticipantsData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [fetching, setFetching] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { colors } = useTheme();
  const { user } = useAuth();

  const convertDate = new ConvertDate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get(
        `/group/participants/list/?group_id=${id}&_page=${page}&_limit=30`
      );

      if (res.status === 200) {
        setParticipants(res.data);
      }
      setLoading(false);
    })();
  }, []);

  const handleGoUserProfile = (userID: string) => {
    navigation.navigate("UserProfile", { id: userID });
  };

  const fetchMoreParticipants = useCallback(async () => {
    setFetching(true);
    const res = await api.get(
      `/group/participants/list/?group_id=${id}&_page=${page}&_limit=30`
    );

    if (res.data.length === 0) {
      setLoadedAll(true);
      setFetching(false);
      return;
    }

    if (page === 0) {
      setParticipants(res.data);
    } else {
      setParticipants((old) => [...old, ...res.data]);
    }
    setFetching(false);
  }, [page]);

  const reachEnd = async (distance: number) => {
    if (distance < 1 || loadedAll) return;

    if (!fetching) {
      setPage((old) => old + 1);
      await fetchMoreParticipants();
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ParticipantsData;
    index: number;
  }) => {
    return (
      <>
        {index % 15 === 0 && (
          <AdBannerWrapper>
            <Banner />
          </AdBannerWrapper>
        )}
        <ParticipantContainer onPress={() => handleGoUserProfile(item.user.id)}>
          <Participant>
            <ParticipantAvatarContainer>
              {item.user.avatar ? (
                <ParticipantAvatar
                  source={{
                    uri: item.user.avatar.url,
                    cache: "immutable",
                    priority: "high",
                  }}
                />
              ) : (
                <ParticipantAvatar
                  source={require("../../assets/avatar-placeholder.png")}
                />
              )}
              <ParticipantStatus
                status={item.user.id === user?.id ? "ONLINE" : item.status}
              />
            </ParticipantAvatarContainer>
            <ParticipantInfosWrapper>
              <PremiumName name={item.user.name} nameSize={16} />
              <JoinedDate>
                {item.group.owner.id === item.user.id
                  ? "Criou em "
                  : "Entrou em "}
                {convertDate.formatToDate(item.participating_since)}
              </JoinedDate>
            </ParticipantInfosWrapper>
            <JoinedDateContainer></JoinedDateContainer>
          </Participant>
          {item.group.owner.id === item.user.id && (
            <OwnerTagContainer>
              <OwnerTag>Dono</OwnerTag>
            </OwnerTagContainer>
          )}
        </ParticipantContainer>
      </>
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={`Participantes (${participants.length})`} backButton />
      <Container>
        <ParticipantsContainer>
          <SectionContainer>
            <SectionTitle>Todos os participantes</SectionTitle>
            <ParticipantsList
              data={participants}
              renderItem={renderItem}
              onEndReached={({ distanceFromEnd }) => reachEnd(distanceFromEnd)}
              ListFooterComponent={
                fetching && !loadedAll ? (
                  <ActivityIndicator
                    style={{ margin: 10 }}
                    size="large"
                    color={colors.primary}
                  />
                ) : (
                  <></>
                )
              }
            />
          </SectionContainer>
        </ParticipantsContainer>
      </Container>
    </>
  );
};

export default Participants;
