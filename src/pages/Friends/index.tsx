import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";

import {
  Container,
  FriendAvatar,
  FriendContainer,
  FriendLeftContainer,
  FriendName,
  FriendsListContainer,
  PresentationContainer,
  PresentationSubtitle,
  PresentationTitle,
  UnreadMessages,
  UnreadMessagesText
} from "./styles";

const Friends: React.FC = () => {
  return (
    <>
      <Header title="Amigos" />
      <Container>
        <PresentationContainer>
          <PresentationTitle>Mensagens diretas</PresentationTitle>
          <PresentationSubtitle>
            Envie mensagens privadas aos seus amigos. Você só pode falar com
            pessoas da sua lista de amigos.
          </PresentationSubtitle>
        </PresentationContainer>
        <FriendsListContainer>
          <FriendContainer>
            <FriendLeftContainer>
              <FriendAvatar
                source={require("../../assets/avatar-placeholder.png")}
              />
              <FriendName>Pedro Henrique</FriendName>
            </FriendLeftContainer>
            <UnreadMessages>
              <UnreadMessagesText>
                {0 > 99 ? "99+" : "0"}
              </UnreadMessagesText>
            </UnreadMessages>
          </FriendContainer>
          <FriendContainer>
            <FriendLeftContainer>
              <FriendAvatar
                source={require("../../assets/avatar-placeholder.png")}
              />
              <FriendName>Pedro Henrique</FriendName>
            </FriendLeftContainer>
          </FriendContainer>
        </FriendsListContainer>
      </Container>
    </>
  );
};

export default Friends;
