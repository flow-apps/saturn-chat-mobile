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

type TypingProps = {
  typingUsers: UserData[];
};

const Typing = ({ typingUsers }: TypingProps) => {
  if (typingUsers.length <= 0) return <></>;

  const names = useMemo(
    () => typingUsers.map((user) => user.name),
    [typingUsers]
  );
  const joinedNames = useMemo(() => names.join(", "), [names]);

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
              {names.length < 5 ? joinedNames : "Varias pessoas"}{" "}
              {names.length <= 1 && names.length < 5 ? "está " : "estão "}
              digitando
            </TypingUsersText>
          </TypingUsersContainer>
        </TypingRightSide>
      </TypingContainer>
    </Container>
  );
};

export default memo(Typing);
