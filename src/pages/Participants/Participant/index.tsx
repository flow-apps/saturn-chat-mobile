import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import {
  Container,
  OptionName,
  OptionNameWrapper,
  ParticipantOptionContainer,
  ParticipantOptions,
  ParticipantOptionsContainer,
  ParticipantOptionsTitle,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import { ParticipantsData } from "@type/interfaces";
import { ParticipantRoles } from "@type/enums";
import api from "@services/api";
import Loading from "@components/Loading";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";

const Participant: React.FC = () => {
  const { colors } = useTheme();
  const { participant } = useRoute().params as {
    [key: string]: ParticipantsData;
  };
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [myRole, setMyRole] = useState("" as ParticipantRoles);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate("Participant");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const participantRes = await api.get(
        `/group/participant/${participant.group.id}`
      );
      if (participantRes.status === 200) {
        const part = participantRes.data.participant as ParticipantsData;
        setMyRole(part.role.toUpperCase() as ParticipantRoles);
      }
      setLoading(false);
    })();
  }, []);

  const authorizedForPunish = [
    ParticipantRoles.ADMIN,
    ParticipantRoles.MODERATOR,
    ParticipantRoles.OWNER,
  ];

  const authorizedForManageRoles = [
    ParticipantRoles.OWNER,
    ParticipantRoles.ADMIN,
    ParticipantRoles.MANAGER,
  ];

  const handleGoChangeRole = async () => {
    navigation.navigate("ChangeRole", { participant, id: participant.id });
  };

  const handleGoPunishParticipant = async (type: string) => {
    navigation.navigate("PunishParticipant", {
      type,
      groupID: participant.group.id,
      participantID: participant.id,
      participant,
    });
  };

  const handleGoUserProfile = () => {
    navigation.navigate("UserProfile", { id: participant.user.id });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={participant.user.name} />
      <Container>
        <ParticipantOptionsContainer>
          <ParticipantOptionsTitle>{t("title")}</ParticipantOptionsTitle>
          <ParticipantOptions>
            <ParticipantOptionContainer onPress={handleGoUserProfile}>
              <OptionNameWrapper>
                <OptionName>
                  <Feather name="user" size={16} /> {t("view_profile")}
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
            {authorizedForManageRoles.includes(myRole) &&
              participant.group.type === "GROUP" &&
              participant.role !== ParticipantRoles.OWNER && (
                <ParticipantOptionContainer onPress={handleGoChangeRole}>
                  <OptionNameWrapper>
                    <OptionName color={colors.primary}>
                      <Feather name="user-plus" size={16} /> {t("change_role")}
                    </OptionName>
                  </OptionNameWrapper>
                </ParticipantOptionContainer>
              )}
            {authorizedForPunish.includes(myRole) &&
              participant.group.type === "GROUP" &&
              participant.role !== ParticipantRoles.OWNER && (
                <>
                  <ParticipantOptionContainer
                    onPress={() => handleGoPunishParticipant("kick")}
                  >
                    <OptionNameWrapper>
                      <OptionName color={colors.red}>
                        <Feather name="user-x" size={16} /> {t("kick")}
                      </OptionName>
                    </OptionNameWrapper>
                  </ParticipantOptionContainer>
                  <ParticipantOptionContainer
                    onPress={() => handleGoPunishParticipant("ban")}
                  >
                    <OptionNameWrapper>
                      <OptionName color={colors.red}>
                        <Feather name="slash" size={16} /> {t("ban")}
                      </OptionName>
                    </OptionNameWrapper>
                  </ParticipantOptionContainer>
                </>
              )}
          </ParticipantOptions>
        </ParticipantOptionsContainer>
      </Container>
    </>
  );
};

export default Participant;
