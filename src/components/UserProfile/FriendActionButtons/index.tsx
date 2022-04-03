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

interface FriendActionButtonsProps {
  name?: string;
  action: (action: "ACCEPT" | "REJECT") => any;
}

const FriendActionButtons: React.FC<FriendActionButtonsProps> = ({ name, action }) => {
  const { colors } = useTheme();

  return (
    <Container>
      <ActionTitle>{name} está querendo ser seu amigo</ActionTitle>
      <ActionsContainer>
        <ActionButtonContainer>
          <ActionButton onPress={() => action("ACCEPT")} color={colors.primary}>
            <ActionButtonText>Aceitar</ActionButtonText>
          </ActionButton>
        </ActionButtonContainer>
        <ActionButtonContainer>
          <ActionButton onPress={() => action("REJECT")} color={colors.red}>
            <ActionButtonText>Recusar</ActionButtonText>
          </ActionButton>
        </ActionButtonContainer>
      </ActionsContainer>
    </Container>
  );
};

export default FriendActionButtons;
