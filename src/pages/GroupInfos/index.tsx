import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
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
  GroupDesc,
  GroupDescContainer,
  GroupDescTitle,
  GroupName,
  ImagesContainer,
  JoinGroupButton,
  JoinGroupButtonText,
  JoinGroupContainer,
  ParticipantsContainer,
  ParticipantsInfosContainer,
  ParticipantsNumber,
  ParticipantsTitle,
} from "./styles";

const GroupInfos: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const { id } = useRoute().params as { id: string };
  const navigation = useNavigation();

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

  useEffect(() => {
    api
      .get(`/group/participant/${id}`)
      .then(() => setIsParticipating(true))
      .catch(() => setIsParticipating(false));
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
                <JoinGroupButton
                  participating={isParticipating}
                  disabled={isParticipating}
                  onPress={handleJoinGroup}
                >
                  <JoinGroupButtonText participating={isParticipating}>
                    <Feather name="user-plus" size={16} />{" "}
                    {isParticipating ? "Participando" : "Participar"}
                  </JoinGroupButtonText>
                </JoinGroupButton>
              </JoinGroupContainer>

              <ParticipantsInfosContainer>
                <ParticipantsContainer>
                  <ParticipantsNumber>290</ParticipantsNumber>
                  <ParticipantsTitle>Participantes</ParticipantsTitle>
                </ParticipantsContainer>
              </ParticipantsInfosContainer>
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
