import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  HeaderTitle,
  ParticipantCount,
  GridContainer,
  ParticipantCard,
  Avatar,
  AvatarText,
  NameContainer,
  Name,
  MoreCard,
  MoreText,
  MoreSubtext,
  ControlsBar,
  ControlButton,
  EndCallButton,
} from "./styles";
import { useCallRoom } from "@hooks/useCallRoom";
import { useWebsocket } from "@contexts/websocket";

interface Participant {
  id: string;
  name: string;
}

const PARTICIPANTS_DATA: Participant[] = [
  { id: "1", name: "Ana Silva" },
  { id: "2", name: "Carlos Oliveira" },
  { id: "3", name: "Beatriz Souza" },
  { id: "4", name: "João Pedro" },
  { id: "5", name: "Mariana Costa" },
  { id: "6", name: "Lucas Mendes" },
  { id: "7", name: "Fernanda Lima" },
  { id: "8", name: "Gabriel Santos" },
];

const MAX_DISPLAY = 6;

const Call: React.FC = () => {
  // Estados para controlar os botões
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const totalParticipants = PARTICIPANTS_DATA.length;
  const hasMore = totalParticipants > MAX_DISPLAY;

  const visibleParticipants = hasMore
    ? PARTICIPANTS_DATA.slice(0, MAX_DISPLAY - 1)
    : PARTICIPANTS_DATA.slice(0, MAX_DISPLAY);

  const remainingCount = totalParticipants - (MAX_DISPLAY - 1);

  const handleOpenMoreParticipants = () => {
    console.log("Abrir lista de participantes");
  };

  const handleToggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  const handleToggleVideo = () => {
    setIsVideoOn((prevState) => !prevState);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing((prevState) => !prevState);
  };

  const handleEndCall = () => {
    console.log("Encerrar chamada");
  };

  const { socket } = useWebsocket();
  const {} = useCallRoom("123");

  return (
    <Container>
      <Header>
        <HeaderTitle>Chamada em Grupo</HeaderTitle>
        <ParticipantCount>{totalParticipants} na chamada</ParticipantCount>
      </Header>

      <GridContainer>
        {visibleParticipants.map((item) => (
          <ParticipantCard key={item.id}>
            <Avatar>
              <AvatarText>{item.name.charAt(0).toUpperCase()}</AvatarText>
            </Avatar>
            <NameContainer>
              <Name numberOfLines={1}>{item.name}</Name>
            </NameContainer>
          </ParticipantCard>
        ))}

        {hasMore && (
          <MoreCard onPress={handleOpenMoreParticipants} activeOpacity={0.7}>
            <MoreText>+{remainingCount}</MoreText>
            <MoreSubtext>Ver todos</MoreSubtext>
          </MoreCard>
        )}
      </GridContainer>

      <ControlsBar>
        {/* Controle Mute */}
        <ControlButton onPress={handleToggleMute} isActive={isMuted}>
          <Feather name={isMuted ? "mic-off" : "mic"} size={24} color="#FFF" />
        </ControlButton>

        {/* Controle Vídeo */}
        <ControlButton onPress={handleToggleVideo} isActive={isVideoOn}>
          <Feather
            name={isVideoOn ? "video" : "video-off"}
            size={24}
            color="#FFF"
          />
        </ControlButton>

        {/* Controle Compartilhar Tela */}
        <ControlButton
          onPress={handleToggleScreenShare}
          isActive={isScreenSharing}
        >
          <Feather name="tv" size={24} color="#FFF" />
        </ControlButton>

        {/* Desligar Chamada */}
        <EndCallButton onPress={handleEndCall}>
          <Feather name="phone-off" size={24} color="#FFF" />
        </EndCallButton>
      </ControlsBar>
    </Container>
  );
};

export default Call;
