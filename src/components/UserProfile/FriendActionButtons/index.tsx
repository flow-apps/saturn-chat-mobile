import React from "react";
import { useTheme } from "styled-components";

import {
  ActionButton,
  ActionButtonContainer,
  ActionButtonText,
  ActionsContainer,
  ActionTitle,
  Container,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";

interface FriendActionButtonsProps {
  name?: string;
  action: (action: "ACCEPT" | "REJECT") => any;
}

const FriendActionButtons: React.FC<FriendActionButtonsProps> = ({
  name,
  action,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslate("Components.FriendActionButtons");

  return (
    <Container>
      <ActionTitle>
        {name} {t("title")}
      </ActionTitle>
      <ActionsContainer>
        <ActionButtonContainer>
          <ActionButton onPress={() => action("ACCEPT")} color={colors.primary}>
            <ActionButtonText>{t("accept")}</ActionButtonText>
          </ActionButton>
        </ActionButtonContainer>
        <ActionButtonContainer>
          <ActionButton onPress={() => action("REJECT")} color={colors.red}>
            <ActionButtonText>{t("reject")}</ActionButtonText>
          </ActionButton>
        </ActionButtonContainer>
      </ActionsContainer>
    </Container>
  );
};

export default FriendActionButtons;
