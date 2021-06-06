import {
  NavigationHelpersContext,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { GroupData } from "../../../@types/interfaces";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import Loading from "../../components/Loading";
import api from "../../services/api";
import {
  Avatar,
  Banner,
  BasicInfos,
  BasicInfosContainer,
  Container,
  GroupContainer,
  ImagesContainer,
  ParticipantsContainer,
  ParticipantsInfosContainer,
  ParticipantsNumber,
  ParticipantsTitle,
  GroupName,
  GroupDescContainer,
  GroupDesc,
  GroupDescTitle,
  JoinGroupContainer,
  JoinGroupButton,
  JoinGroupButtonText,
} from "./styles";
import { Feather } from "@expo/vector-icons";

const GroupInfos: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [loading, setLoading] = useState(true);
  const { id } = useRoute().params as { id: string };
  const { colors } = useTheme();
  const navigation = useNavigation();

  console.log(group);

  useEffect(() => {
    async function getGroup() {
      setLoading(true);
      const response = await api.get(`/group/${id}`);

      if (response.status === 200) {
        setGroup(response.data);
      }
      setLoading(false);
    }
    getGroup();
  }, []);

  if (loading) return <Loading />;

  async function handleJoinGroup() {
    const response = await api.get(`/group/participants/new/${group.id}`);

    if (response.status === 200) {
      return navigation.navigate("Chat", {
        screen: "ChatTalk",
        params: {
          id: group.id,
        },
      });
    }
  }

  return (
    <>
      <Header title={group.name} backButton />
      <Container>
        <GroupContainer>
          <BasicInfosContainer>
            <ImagesContainer>
              <Banner />
              <Avatar source={{ uri: group.group_avatar.url }} />
            </ImagesContainer>
            <BasicInfos>
              <GroupName>{group.name}</GroupName>

              <JoinGroupContainer>
                <JoinGroupButton onPress={handleJoinGroup}>
                  <JoinGroupButtonText>
                    <Feather name="user-plus" size={16} /> Participando
                  </JoinGroupButtonText>
                </JoinGroupButton>
              </JoinGroupContainer>

              <HorizontalLine />
              <ParticipantsInfosContainer>
                <ParticipantsContainer>
                  <ParticipantsNumber>290</ParticipantsNumber>
                  <ParticipantsTitle>Participantes</ParticipantsTitle>
                </ParticipantsContainer>
              </ParticipantsInfosContainer>
              <HorizontalLine />
              <GroupDescContainer>
                <GroupDescTitle>Descrição</GroupDescTitle>
                <GroupDesc>{group.description}</GroupDesc>
              </GroupDescContainer>
            </BasicInfos>
          </BasicInfosContainer>
        </GroupContainer>
      </Container>
    </>
  );
};

export default GroupInfos;
