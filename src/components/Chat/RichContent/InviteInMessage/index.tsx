import React, { useEffect, useState } from "react";
import { InviteData } from "../../../../../@types/interfaces";
import { useAuth } from "../../../../contexts/auth";
import api from "../../../../services/api";
import LoadingIndicator from "../../../LoadingIndicator";

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
  LottieAnimation,
  LottieAnimationContainer,
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
            setInvite(res.data.invite);

            if (res.data.participant.state === "JOINED") {
              setParticipating(true);
            } else {
              setParticipating(false);
            }
          }
        })
        .catch(() => setInvite(null));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    );
  }

  if (!invite && !loading) {
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
        <AcceptInviteButton enabled={!participating}>
          <AcceptInviteText>
            {participating ? "Você já entrou!" : "Entrar no grupo"}
          </AcceptInviteText>
        </AcceptInviteButton>
      </Container>
    </>
  );
};

export default InviteInMessage;
