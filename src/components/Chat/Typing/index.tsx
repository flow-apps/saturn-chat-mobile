import React, { useMemo } from 'react';
import { UserData } from '../../../../@types/interfaces';
import { useAuth } from '../../../contexts/auth';
import { Container, TypingContainer, TypingLeftSide, TypingRightSide, TypingAnimation, TypingUsersText, TypingUsersContainer } from './styles';

type TypingProps = {
  typingUsers: UserData[]
}

const Typing = ({ typingUsers }: TypingProps) => {

  const { user } = useAuth()
  const validUsers = useMemo(() => {
    return typingUsers.filter(TUser => TUser.id === user?.id)
  }, [typingUsers.length])

  const userNames = validUsers.map(User => User.name)

  if (validUsers.length <= 0) return <></>

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
              {validUsers.length < 5 ? userNames.join(", ") : "Vários usuários"}
                {" "}
              {validUsers.length <= 1 && validUsers.length < 5 ? "está " : "estão "} 
                digitando
            </TypingUsersText>
          </TypingUsersContainer>
        </TypingRightSide>
      </TypingContainer>
    </Container>
  )
}

export default Typing;