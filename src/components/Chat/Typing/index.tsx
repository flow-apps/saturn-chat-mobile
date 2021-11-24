import React, { useMemo } from 'react';
import { UserData } from '../../../../@types/interfaces';
import { Container, TypingContainer, TypingLeftSide, TypingRightSide, TypingAnimation, TypingUsersText, TypingUsersContainer } from './styles';

type TypingProps = {
  typingUsers: UserData[]
}

const Typing = ({ typingUsers }: TypingProps) => {  
  
  const userNames = useMemo(() => typingUsers.map(User => User.name), [typingUsers])

  if (userNames.length <= 0) return <></>

  return (
    <Container>
      <TypingContainer>
        <TypingLeftSide>
          <TypingAnimation 
            source={require("../../../assets/typing.json")}
            autoPlay
            loop
          />
        </TypingLeftSide>
        <TypingRightSide>
          <TypingUsersContainer>
            <TypingUsersText numberOfLines={1}>
              {userNames.length < 5 ? userNames.join(", ") : "Vários usuários"}
                {" "}
              {userNames.length <= 1 && userNames.length < 5 ? "está " : "estão "} 
                digitando
            </TypingUsersText>
          </TypingUsersContainer>
        </TypingRightSide>
      </TypingContainer>
    </Container>
  )
}

export default Typing;