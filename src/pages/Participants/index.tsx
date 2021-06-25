import React from "react";
import Header from "../../components/Header";
import avatar from "../../assets/avatar.jpg";
import {
  Container,
  ParticipantsContainer,
  SectionContainer,
  SectionTitle,
  ParticipantsList,
  ParticipantContainer,
  ParticipantAvatar,
  ParticipanteName,
} from "./styles";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import api from "../../services/api";

const Participants: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    (async () => {
      // const res = api.get("");
    })();
  }, []);

  return (
    <>
      <Header title="Participantes (99)" />
      <Container>
        <ParticipantsContainer>
          <SectionContainer>
            <SectionTitle>Administradores</SectionTitle>
            <ParticipantsList>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
            </ParticipantsList>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>Todos os participantes</SectionTitle>
            <ParticipantsList>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
              <ParticipantContainer>
                <ParticipantAvatar source={avatar} />
                <ParticipanteName>Pedro Henrique</ParticipanteName>
              </ParticipantContainer>
            </ParticipantsList>
          </SectionContainer>
        </ParticipantsContainer>
      </Container>
    </>
  );
};

export default Participants;
