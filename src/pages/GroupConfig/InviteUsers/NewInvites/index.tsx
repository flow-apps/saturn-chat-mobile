import React, { useState } from "react";
import Header from "../../../../components/Header";
import Button from "../../../../components/Button";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Container,
  CreateInviteLinkConfig,
  CreateInviteLinkConfigInline,
  CreateInviteLinkConfigs,
  CreateInviteLinkContainer,
  CreateInviteLinkOptionLabel,
  CreateInviteLinkOptionText,
  CreateInviteLinkSubtitle,
  CreateInviteLinkTitle,
  CreateInviteLinkWrapper,
  YourInvitesContainer,
  YourInvitesTitle,
  YourInvitesList,
  InviteContainer,
  InviteLeftSide,
  InviteLink,
  InviteDuration,
  InviteRemoveButton,
  InviteRemoveText,
  InviteUsage,
  CreateInviteLinkOptionScroll,
  CreateInviteLinkOptionCard,
  CreateInviteLinkOptionCardText,
} from "./styles";
import Toast from "react-native-simple-toast";
import Clipboard from "expo-clipboard";
import Switcher from "../../../../components/Switcher";
import Input from "../../../../components/Input";
import { useTheme } from "styled-components";

const NewInvites: React.FC = () => {
  const [permanent, setPermanent] = useState(false);
  const [unlimitedUsages, setUnlimitedUsages] = useState(false);
  const [usages, setUsages] = useState("1");

  const handleCopyLink = (url: string) => {
    Clipboard.setString(url);
    Toast.show("Convite copiado!");
  };

  const { colors } = useTheme();

  return (
    <>
      <Header title="Criar convites" backButton />
      <Container>
        <CreateInviteLinkContainer>
          <CreateInviteLinkTitle>Gerar convite</CreateInviteLinkTitle>
          <CreateInviteLinkSubtitle>
            Você pode gerar convites com essas configurações:
          </CreateInviteLinkSubtitle>
          <CreateInviteLinkWrapper>
            <CreateInviteLinkConfigs>
              <CreateInviteLinkConfigInline>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    Convite permanente
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <Switcher
                  currentValue={permanent}
                  onChangeValue={setPermanent}
                />
              </CreateInviteLinkConfigInline>
              <CreateInviteLinkConfigInline>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    Usos ilimitados
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <Switcher
                  currentValue={unlimitedUsages}
                  onChangeValue={setUnlimitedUsages}
                />
              </CreateInviteLinkConfigInline>
              <CreateInviteLinkConfig disabled={unlimitedUsages}>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    Limite de usos (até 999)
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <Input
                  keyboardType="numeric"
                  value={usages}
                  maxLength={3}
                  onChangeText={setUsages}
                />
              </CreateInviteLinkConfig>
              <CreateInviteLinkConfig disabled={permanent}>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    Expirar em
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <CreateInviteLinkOptionScroll>
                  <CreateInviteLinkOptionCard>
                    <CreateInviteLinkOptionCardText>
                      1 Dia
                    </CreateInviteLinkOptionCardText>
                  </CreateInviteLinkOptionCard>
                  <CreateInviteLinkOptionCard>
                    <CreateInviteLinkOptionCardText>
                      7 Dias
                    </CreateInviteLinkOptionCardText>
                  </CreateInviteLinkOptionCard>
                  <CreateInviteLinkOptionCard>
                    <CreateInviteLinkOptionCardText>
                      15 Dias
                    </CreateInviteLinkOptionCardText>
                  </CreateInviteLinkOptionCard>
                  <CreateInviteLinkOptionCard>
                    <CreateInviteLinkOptionCardText>
                      30 Dias
                    </CreateInviteLinkOptionCardText>
                  </CreateInviteLinkOptionCard>
                </CreateInviteLinkOptionScroll>
              </CreateInviteLinkConfig>
            </CreateInviteLinkConfigs>
            <Button title="Gerar" />
          </CreateInviteLinkWrapper>
        </CreateInviteLinkContainer>
        <YourInvitesContainer>
          <YourInvitesTitle>Convites ativos</YourInvitesTitle>
          <YourInvitesList>
            <InviteContainer>
              <InviteLeftSide>
                <InviteLink onLongPress={() => handleCopyLink("oi")}>
                  <Feather name="link" size={16} />{" "}
                  https://saturnchat.com/inv/387tegd
                </InviteLink>
                <InviteDuration>
                  <Feather name="clock" size={14} /> Expira em:{" "}
                  <MaterialCommunityIcons name="infinity" />
                </InviteDuration>
                <InviteUsage>Foi usado 10 vezes</InviteUsage>
              </InviteLeftSide>
              <InviteRemoveButton>
                <InviteRemoveText>
                  <Feather name="trash" size={20} color={colors.red} />
                </InviteRemoveText>
              </InviteRemoveButton>
            </InviteContainer>
            <InviteContainer>
              <InviteLeftSide>
                <InviteLink>
                  <Feather name="link" size={16} />{" "}
                  https://saturnchat.com/inv/387tegd
                </InviteLink>
                <InviteDuration>
                  <Feather name="clock" size={14} /> Expira em:{" "}
                  <MaterialCommunityIcons name="infinity" />
                </InviteDuration>
                <InviteUsage>Foi usado 3 vezes</InviteUsage>
              </InviteLeftSide>
              <InviteRemoveButton>
                <InviteRemoveText>
                  <Feather name="trash" size={20} color={colors.red} />
                </InviteRemoveText>
              </InviteRemoveButton>
            </InviteContainer>
          </YourInvitesList>
        </YourInvitesContainer>
      </Container>
    </>
  );
};

export default NewInvites;
