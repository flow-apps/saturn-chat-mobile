import React, { memo, useEffect, useState } from "react";
import SimpleToast from "react-native-simple-toast";
import { InviteData } from "@type/interfaces";
import { useAuth } from "@contexts/auth";
import { ParticipantData } from "@pages/Home";
import api from "@services/api";
import LoadingIndicator from "@components/LoadingIndicator";

import analytics from "@react-native-firebase/analytics";

import {
  AcceptInviteButton,
  AcceptInviteText,
  Container,
  GroupAvatar,
  GroupContainer,
  GroupLeftSideContainer,
  GroupName,
  GroupDescription,
  GroupRightSideContainer,
  InviteTitle,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";
import { ParticipantStates } from "@type/enums";

interface InviteInMessageProps {
  inviteID: string;
}

const InviteInMessage: React.FC<InviteInMessageProps> = ({ inviteID }) => {
  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState<null | InviteData>(null);
  const [participating, setParticipating] = useState(false);

  const { user } = useAuth();
  const { t } = useTranslate("Components.Chat.InviteInMessage");

  useEffect(() => {
    (async () => {
      setLoading(true);
      api
        .get(`/invites/${inviteID}?user_id=${user?.id}`)
        .then((res) => {
          if (res.status === 200) {
            setInvite(res.data.invite);

            const participant = res.data?.participant as ParticipantData;

            if (!participant) {
              return setParticipating(false);
            }

            if (participant.state === ParticipantStates.JOINED) {
              setParticipating(true);
            }
          }
        })
        .catch(() => setInvite(null))
        .finally(() => {
          setLoading(false);
        });
    })();
  }, []);

  const handleJoin = async () => {
    await api
      .get(`/inv/join/${inviteID}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data as ParticipantData;

          analytics().logEvent("join_group", {
            method: "invite",
            group_id: data.group_id,
          });

          SimpleToast.show(
            t("toasts.joined", { name: data.group.name }),
            SimpleToast.SHORT
          );
          setParticipating(true);
        }
      })
      .catch((err) => {
        SimpleToast.show(t("toasts.error"), SimpleToast.SHORT);
      });
  };

  if (loading) {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    );
  }

  if (!invite) {
    return (
      <Container>
        <GroupRightSideContainer>
          <GroupName>{t("invalid_invite_title")}</GroupName>
          <GroupDescription>{t("invalid_invite_subtitle")}</GroupDescription>
        </GroupRightSideContainer>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <InviteTitle>{t("invite_title")}</InviteTitle>
        <GroupContainer>
          <GroupRightSideContainer>
            <GroupAvatar uri={invite?.group?.group_avatar?.url} />
          </GroupRightSideContainer>
          <GroupLeftSideContainer>
            <GroupName numberOfLines={1} ellipsizeMode="middle">
              {invite.group.name}
            </GroupName>
            <GroupDescription numberOfLines={2}>
              {invite.group.description || t("no_desc")}
            </GroupDescription>
          </GroupLeftSideContainer>
        </GroupContainer>
        <AcceptInviteButton onPress={handleJoin} enabled={!participating}>
          <AcceptInviteText>
            {participating ? t("joined_text") : t("join_text")}
          </AcceptInviteText>
        </AcceptInviteButton>
      </Container>
    </>
  );
};

export default memo(InviteInMessage, (prev, next) => {
  return prev.inviteID === next.inviteID;
});
