import React, { useMemo, memo } from "react";
import { UserData } from "@type/interfaces";
import {
  Container,
  TypingContainer,
  TypingLeftSide,
  TypingRightSide,
  TypingAnimation,
  TypingUsersText,
  TypingUsersContainer,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";

type TypingProps = {
  typingUsers: UserData[];
};

const Typing = ({ typingUsers }: TypingProps) => {
  const { t } = useTranslate("Components.Chat.Typing");

  const names = useMemo(
    () => {
      // Remove all duplicate names
      return [...new Set(typingUsers.map((user) => user.name))];
    },
    [typingUsers]
  );
  const joinedNames = useMemo(() => names.join(", "), [names]);

  if (typingUsers.length <= 0) 
    return null;

  return (
    <Container>
      <TypingContainer>
        <TypingLeftSide>
          <TypingAnimation
            source={require("@assets/typing.json")}
            autoPlay
            loop
          />
        </TypingLeftSide>
        <TypingRightSide>
          <TypingUsersContainer>
            <TypingUsersText numberOfLines={1}>
              {names.length < 5 ? joinedNames : t("many")}{" "}
              {names.length <= 1 && names.length < 5
                ? t("typing_user", { count: 1 })
                : t("typing_user", { count: names.length })}
              {t("typing")}
            </TypingUsersText>
          </TypingUsersContainer>
        </TypingRightSide>
      </TypingContainer>
    </Container>
  );
};

export default memo(Typing);
