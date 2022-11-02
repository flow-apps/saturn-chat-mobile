import React, { useEffect, useState } from "react";
import AdBanner from "../../components/Ads/Banner";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/core";
import { GroupData } from "../../../@types/interfaces";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import api from "../../services/api";
import {
  AdBannerWrapper,
  Avatar,
  AvatarContainer,
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
import { useFirebase } from "../../contexts/firebase";
import SimpleToast from "react-native-simple-toast";
import { StackNavigationProp } from "@react-navigation/stack";

const GroupInfos: React.FC = () => {
  const [group, setGroup] = useState<GroupData>();
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { id } = useRoute().params as { id: string };

  const { analytics } = useFirebase();

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
      .then((res) => {
        setIsParticipating(res.data.participant.state === "JOINED");
      })
      .catch(() => setIsParticipating(false));
  }, []);

  async function handleJoinGroup() {
    await api
      .get(`/group/participants/new/${group?.id}`)
      .then(async () => {
        setIsParticipating(true);
        await analytics().logEvent("join_group", {
          group_id: id,
        });
        return navigation.navigate("Chat", { id });
      })
      .catch(() => SimpleToast.show("Erro ao entrar no grupo!"));
  }

  const handleGoAvatar = () => {
    navigation.navigate("ImagePreview", {
      name: group?.group_avatar.name,
      url: group?.group_avatar.url,
    });
  };

  if (loading || !group) return <Loading />;

  return (
    <>
      <Header title={group.name} />
      <Container>
        <GroupContainer>
          <BasicInfosContainer>
            <ImagesContainer>
              <Banner />
              <AvatarContainer
                onPress={handleGoAvatar}
                disabled={!group.group_avatar}
                activeOpacity={0.7}
              >
                <Avatar uri={group.group_avatar?.url} />
              </AvatarContainer>
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
                    <Feather
                      name={isParticipating ? "user-check" : "user-plus"}
                      size={16}
                    />{" "}
                    {isParticipating ? "Participando" : "Participar"}
                  </JoinGroupButtonText>
                </JoinGroupButton>
              </JoinGroupContainer>
              <ParticipantsInfosContainer>
                <ParticipantsContainer>
                  <ParticipantsNumber>
                    {String(group?.participantsAmount).padStart(2, "0")}
                  </ParticipantsNumber>
                  <ParticipantsTitle>Participantes</ParticipantsTitle>
                </ParticipantsContainer>
              </ParticipantsInfosContainer>
              <GroupTagsContainer>
                <GroupTagsTitle>
                  <Feather name="tag" size={20} /> Tags do grupo
                </GroupTagsTitle>
                <GroupTagsScroll>
                  {group.tags &&
                    group.tags.map((tag, index) => (
                      <GroupTagContainer key={index}>
                        <GroupTagText>{tag}</GroupTagText>
                      </GroupTagContainer>
                    ))}
                </GroupTagsScroll>
              </GroupTagsContainer>
              <AdBannerWrapper>
                <AdBanner />
              </AdBannerWrapper>
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
