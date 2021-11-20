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
  AmountUsagesSlider,
} from "./styles";
import Toast from "react-native-simple-toast";
import * as Clipboard from "expo-clipboard";
import Switcher from "../../../../components/Switcher";
import Input from "../../../../components/Input";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import api from "../../../../services/api";

import * as Localize from "expo-localization";
import { InviteData } from "../../../../../@types/interfaces";
import { ConvertDate } from "../../../../utils/convertDate";
import config from "../../../../config";

const NewInvites: React.FC = () => {
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [permanent, setPermanent] = useState(false);
  const [unlimitedUsages, setUnlimitedUsages] = useState(false);
  const [usages, setUsages] = useState(1);
  const [expireIn, setExpireIn] = useState(1);

  const convertDate = new ConvertDate();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const expireInValues = [1, 7, 15, 30];

  useEffect(() => {
    (async () => {
      const response = await api.get(`/invites/list/${id}`);

      if (response.status === 200) {
        setInvites(response.data);
      }
    })();
  }, []);

  const handleCreateInvite = async () => {
    const response = await api.post("/invites", {
      groupId: id,
      isPermanent: String(permanent),
      isUnlimitedUsage: String(unlimitedUsages),
      usageAmount: Number(usages),
      expireIn: expireIn,
      expireTimezone: Localize.timezone,
    });

    if (response.status === 200) {
      setInvites((old) => [response.data, ...old]);
    }
  };

  const handleDeleteInvite = async (id: string) => {
    const response = await api.delete(`/invites/${id}`);

    if (response.status === 204) {
      setInvites((old) => old.filter((inv) => inv.id !== id));
    }
  };

  const handleCopyLink = (url: string) => {
    Clipboard.setString(url);
    Toast.show("Convite copiado!");
  };

  const { colors } = useTheme();

  return (
    <>
      <Header title="Criar convites"  />
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
                    Limite de usos ({String(usages).padStart(3, "0")})
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <AmountUsagesSlider
                  step={1}
                  value={usages}
                  minimumValue={1}
                  maximumValue={250}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.light_gray}
                  thumbTintColor={colors.secondary}
                  onSlidingComplete={setUsages}
                />
              </CreateInviteLinkConfig>
              <CreateInviteLinkConfig disabled={permanent}>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    Expirar em {expireIn} dias
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <CreateInviteLinkOptionScroll>
                  {expireInValues.map((value, index) => (
                    <CreateInviteLinkOptionCard
                      selected={value === expireIn}
                      key={index}
                      onPress={() => setExpireIn(value)}
                    >
                      <CreateInviteLinkOptionCardText>
                        {value} Dias
                      </CreateInviteLinkOptionCardText>
                    </CreateInviteLinkOptionCard>
                  ))}
                </CreateInviteLinkOptionScroll>
              </CreateInviteLinkConfig>
            </CreateInviteLinkConfigs>
            <Button title="Gerar" onPress={handleCreateInvite} />
          </CreateInviteLinkWrapper>
        </CreateInviteLinkContainer>
        <YourInvitesContainer>
          <YourInvitesTitle>Convites ativos</YourInvitesTitle>
          <YourInvitesList>
            {invites.map((invite, index) => (
              <InviteContainer key={index}>
                <InviteLeftSide>
                  <InviteLink
                    numberOfLines={1}
                    onLongPress={() =>
                      handleCopyLink(
                        config.WEBSITE_URL + "/invite/" + invite.invite_code
                      )
                    }
                  >
                    <Feather name="link" size={16} /> /invite/
                    {invite.invite_code}
                  </InviteLink>
                  <InviteDuration>
                    <Feather name="clock" size={14} /> Expira em:{" "}
                    {invite.is_permanent ? (
                      <MaterialCommunityIcons name="infinity" />
                    ) : (
                      convertDate.formatToDate(invite.expire_in, true)
                    )}
                  </InviteDuration>
                  <InviteUsage>
                    Foi usado {invite.usage_amount} vezes de {""}
                    {invite.is_unlimited_usage ? (
                      <MaterialCommunityIcons name="infinity" />
                    ) : (
                      invite.max_usage_amount
                    )}
                  </InviteUsage>
                </InviteLeftSide>
                <InviteRemoveButton>
                  <InviteRemoveText>
                    <Feather
                      name="trash"
                      onPress={() => handleDeleteInvite(invite.id)}
                      size={20}
                      color={colors.red}
                    />
                  </InviteRemoveText>
                </InviteRemoveButton>
              </InviteContainer>
            ))}
          </YourInvitesList>
        </YourInvitesContainer>
      </Container>
    </>
  );
};

export default NewInvites;
