import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { useTheme } from "styled-components";
import { InviteData } from "../../../../@types/interfaces";

interface GroupInviteProps {
  invite: InviteData;
  OpenGroupProfile: (userID: string) => void;
  handleAcceptOrRejectInvite: (
    friendID: string,
    state: "ACCEPT" | "REJECT"
  ) => Promise<void>;
}

import {
  GroupInviteContainer,
  GroupInviteLeftContainer,
  GroupInviteAvatar,
  GroupInviteName,
  GroupInviteRightContainer,
  GroupInviteActionButton,
  GroupInviteActionButtonText,
  GroupInviteInfosWrapper,
  GroupInviteParticipantsAmount,
} from "./styles";
import { useTranslate } from "../../../hooks/useTranslate";

const GroupInvite: React.FC<GroupInviteProps> = ({
  invite,
  OpenGroupProfile,
  handleAcceptOrRejectInvite,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslate("Components.GroupInvite")

  if (!invite)
    return <></>

  return (
    <GroupInviteContainer onPress={() => OpenGroupProfile(invite.group_id)}>
      <GroupInviteLeftContainer>
        <GroupInviteAvatar uri={invite.group.group_avatar?.url} />
        <GroupInviteInfosWrapper>
          <GroupInviteName numberOfLines={1} ellipsizeMode="middle">
            {invite.group.name}
          </GroupInviteName>
          <GroupInviteParticipantsAmount>
            {invite?.participants_amount} {t("participants")}
          </GroupInviteParticipantsAmount>
        </GroupInviteInfosWrapper>
      </GroupInviteLeftContainer>
      <GroupInviteRightContainer>
        <GroupInviteActionButton
          onPress={() => handleAcceptOrRejectInvite(invite?.id, "ACCEPT")}
        >
          <GroupInviteActionButtonText color={colors.primary}>
            {t("join")}
          </GroupInviteActionButtonText>
        </GroupInviteActionButton>
        <GroupInviteActionButton
          onPress={() => handleAcceptOrRejectInvite(invite?.id, "REJECT")}
        >
          <GroupInviteActionButtonText color={colors.red}>
            <Feather name="x" size={20} />
          </GroupInviteActionButtonText>
        </GroupInviteActionButton>
      </GroupInviteRightContainer>
    </GroupInviteContainer>
  );
};

export default GroupInvite;
