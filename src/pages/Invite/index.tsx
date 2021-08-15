import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  AcceptInviteButton,
  AcceptInviteText,
  Container,
  InviteAvatarImage,
  InviteContainer,
  InviteGroupName,
  InviteTitle,
  ParticipantsContainer,
} from "./styles";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";

const Invite: React.FC = () => {

  const route = useRoute()
  const params = route.params

  console.log(params);
  

  return (
    <>
      <StatusBar backgroundColor="#0061ff" />
      <Container
        colors={["#0061ff", "#0059ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      >
        <InviteContainer>
          <InviteTitle>Você foi convidado(a) para o grupo:</InviteTitle>
          <InviteAvatarImage source={require("../../assets/avatar.jpg")} />
          <InviteGroupName>Game Santos</InviteGroupName>
          <ParticipantsContainer>
            <Feather name="users" /> 80 participantes
          </ParticipantsContainer>
          <AcceptInviteButton>
            <AcceptInviteText>Aceitar convite</AcceptInviteText>
          </AcceptInviteButton>
        </InviteContainer>
      </Container>
    </>
  );
};

export default Invite;
