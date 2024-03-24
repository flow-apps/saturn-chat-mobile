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

interface InviteInMessageProps {
  inviteID: string;
}

const InviteInMessage: React.FC<InviteInMessageProps> = ({ inviteID }) => {
  const [loading, setLoading] = useState(false);
  const [invite, setInvite] = useState<null | InviteData>(null);
  const [participating, setParticipating] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      api
        .get(`/invites/${inviteID}?user_id=${user?.id}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.participant.state === "JOINED") {
              setParticipating(true);
            } else {
              setParticipating(false);
            }
            setInvite(res.data.invite);
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

          SimpleToast.show(`Você entrou no grupo '${data.group.name}'!`);
          setParticipating(true);
        }
      })
      .catch((err) => {
        SimpleToast.show("Erro ao usar o convite");
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
          <GroupName>🚫 Convite inválido</GroupName>
          <GroupDescription>
            O convite pode ter expirado, apagado ou ter atingido o número máximo
            de usos!
          </GroupDescription>
        </GroupRightSideContainer>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <InviteTitle>Convite para:</InviteTitle>
        <GroupContainer>
          <GroupRightSideContainer>
            <GroupAvatar uri={invite?.group?.group_avatar?.url} />
          </GroupRightSideContainer>
          <GroupLeftSideContainer>
            <GroupName numberOfLines={1} ellipsizeMode="middle">
              {invite.group.name}
            </GroupName>
            <GroupDescription numberOfLines={2}>
              {invite.group.description || "Sem descrição"}
            </GroupDescription>
          </GroupLeftSideContainer>
        </GroupContainer>
        <AcceptInviteButton onPress={handleJoin} enabled={!participating}>
          <AcceptInviteText>
            {participating ? "Você já entrou!" : "Entrar no grupo"}
          </AcceptInviteText>
        </AcceptInviteButton>
      </Container>
    </>
  );
};

export default memo(InviteInMessage, (prev, next) => {
  return prev.inviteID === next.inviteID;
});
