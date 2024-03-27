import React from "react";
import Header from "@components/Header";
import {
  Container,
  ParticipantsContainer,
  SectionContainer,
  SectionTitle,
  ParticipantsList,
  ParticipantContainer,
  ParticipantAvatar,
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
import api from "@services/api";
import { useState } from "react";
import Loading from "@components/Loading";
import { DateUtils } from "@utils/date";
import { useCallback } from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";
import Banner from "@components/Ads/Banner";
import { AdBannerWrapper } from "../GroupInfos/styles";
import PremiumName from "@components/PremiumName";
import { ParticipantsData } from "@type/interfaces";
import { useAuth } from "@contexts/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<ParticipantsData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [fetching, setFetching] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { colors } = useTheme();
  const { user } = useAuth();

  const { t } = useTranslate("Participants");

  const convertDate = new DateUtils();

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

  const handleGoParticipant = (participant: ParticipantsData) => {
    navigation.navigate("Participant", { participant });
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
        <ParticipantContainer onPress={() => handleGoParticipant(item)}>
          <Participant>
            <ParticipantAvatarContainer>
              <ParticipantAvatar uri={item.user.avatar?.url} />
              <ParticipantStatus
                status={item.user.id === user?.id ? "ONLINE" : item.status}
              />
            </ParticipantAvatarContainer>
            <ParticipantInfosWrapper>
              <PremiumName name={item.user.name} nameSize={16} />
              <JoinedDate>
                {item.group.owner.id === item.user.id
                  ? t("created", {
                      date: convertDate.formatToDate(item.participating_since),
                    })
                  : t("joined", {
                      date: convertDate.formatToDate(item.participating_since),
                    })}
              </JoinedDate>
            </ParticipantInfosWrapper>
            <JoinedDateContainer></JoinedDateContainer>
          </Participant>
          {item.group.owner.id === item.user.id && (
            <OwnerTagContainer>
              <OwnerTag>{t("owner")}</OwnerTag>
            </OwnerTagContainer>
          )}
        </ParticipantContainer>
      </>
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={t("header_title", { count: participants.length })} />
      <Container>
        <ParticipantsContainer>
          <SectionContainer>
            <SectionTitle>{t("title")}</SectionTitle>
            <ParticipantsList
              data={participants}
              renderItem={renderItem}
              onEndReached={({ distanceFromEnd }) => reachEnd(distanceFromEnd)}
              ListFooterComponent={
                fetching &&
                !loadedAll && (
                  <ActivityIndicator
                    style={{ margin: 10 }}
                    size="large"
                    color={colors.primary}
                  />
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
