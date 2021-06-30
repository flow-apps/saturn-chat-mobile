import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { GroupData } from "../../../@types/interfaces";
import Header from "../../components/Header";
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
  GroupTagContainer,
  GroupTagsContainer,
  GroupTagsScroll,
  GroupTagsTitle,
  GroupTagText,
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
  const [group, setGroup] = useState<GroupData>();
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const navigation = useNavigation();
  const { id } = useRoute().params as { id: string };

  useEffect(() => {
    async function getGroup() {
      if (group) return;

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

  async function handleJoinGroup() {
    const response = await api.get(`/group/participants/new/${group?.id}`);

    if (response.status === 200) {
      setIsParticipating(true);
      return navigation.navigate("Chat", {
        screen: "ChatTalk",
        params: {
          id: group?.id,
        },
      });
    }
  }
  if (loading || !group) return <Loading />;

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
              <GroupTagsContainer>
                <GroupTagsTitle>
                  <Feather name="tag" size={20} /> Tags do grupo
                </GroupTagsTitle>
                <GroupTagsScroll>
                  {group.tags ? (
                    group.tags.map((tag, index) => (
                      <GroupTagContainer key={index}>
                        <GroupTagText>{tag}</GroupTagText>
                      </GroupTagContainer>
                    ))
                  ) : (
                    <></>
                  )}
                </GroupTagsScroll>
              </GroupTagsContainer>
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
