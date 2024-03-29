import React, { useState } from "react";
import Header from "@components/Header";
import Button from "@components/Button";
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
import Switcher from "@components/Switcher";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import api from "@services/api";

import * as Localize from "expo-localization";
import { InviteData } from "@type/interfaces";
import { DateUtils } from "@utils/date";
import config from "../../../../config";
import { AnimatePresence, MotiView } from "moti";
import { useTranslate } from "@hooks/useTranslate";

const NewInvites: React.FC = () => {
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [permanent, setPermanent] = useState(false);
  const [unlimitedUsages, setUnlimitedUsages] = useState(false);
  const [usages, setUsages] = useState(1);
  const [expireIn, setExpireIn] = useState(1);
  const { t } = useTranslate("NewInvites");

  const convertDate = new DateUtils();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const expireInValues = [1, 3, 7, 15, 30];

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

  const handleCopyLink = async (url: string) => {
    await Clipboard.setStringAsync(url);
    Toast.show("Convite copiado!");
  };

  const { colors } = useTheme();

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <CreateInviteLinkContainer>
          <CreateInviteLinkTitle>{t("title")}</CreateInviteLinkTitle>
          <CreateInviteLinkSubtitle>{t("subtitle")}</CreateInviteLinkSubtitle>
          <CreateInviteLinkWrapper>
            <CreateInviteLinkConfigs>
              <CreateInviteLinkConfigInline>
                <CreateInviteLinkOptionLabel>
                  <CreateInviteLinkOptionText>
                    {t("permanent")}
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
                    {t("usage_unlimited")}
                  </CreateInviteLinkOptionText>
                </CreateInviteLinkOptionLabel>
                <Switcher
                  currentValue={unlimitedUsages}
                  onChangeValue={setUnlimitedUsages}
                />
              </CreateInviteLinkConfigInline>
              <AnimatePresence>
                {!unlimitedUsages && (
                  <MotiView
                    from={{ opacity: 1, height: 60 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      type: "timing",
                      duration: 250,
                    }}
                  >
                    <CreateInviteLinkConfig>
                      <CreateInviteLinkOptionLabel>
                        <CreateInviteLinkOptionText>
                          {t("usage", { count: usages })}
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
                        onValueChange={setUsages}
                      />
                    </CreateInviteLinkConfig>
                  </MotiView>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!permanent && (
                  <MotiView
                    from={{ opacity: 1, height: 100 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      type: "timing",
                      duration: 250,
                    }}
                  >
                    <CreateInviteLinkConfig>
                      <CreateInviteLinkOptionLabel>
                        <CreateInviteLinkOptionText>
                          {t("expire", { count: expireIn })}
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
                              {String(value).padStart(2, "0")} {t("day")}
                            </CreateInviteLinkOptionCardText>
                          </CreateInviteLinkOptionCard>
                        ))}
                      </CreateInviteLinkOptionScroll>
                    </CreateInviteLinkConfig>
                  </MotiView>
                )}
              </AnimatePresence>
            </CreateInviteLinkConfigs>
            <Button title={t("generate")} onPress={handleCreateInvite} />
          </CreateInviteLinkWrapper>
        </CreateInviteLinkContainer>
        <YourInvitesContainer>
          <YourInvitesTitle>{t("active_invites")}</YourInvitesTitle>
          <YourInvitesList>
            {invites.map((invite, index) => (
              <InviteContainer key={index}>
                <InviteLeftSide>
                  <InviteLink
                    numberOfLines={1}
                    onPress={() =>
                      handleCopyLink(
                        config.WEBSITE_URL + "/invite/" + invite.invite_code
                      )
                    }
                  >
                    <Feather name="link" size={16} /> /invite/
                    {invite.invite_code}
                  </InviteLink>
                  <InviteDuration>
                    <Feather name="clock" size={14} /> {t("expire_in")}{" "}
                    {invite.is_permanent ? (
                      <MaterialCommunityIcons name="infinity" size={14} />
                    ) : (
                      convertDate.formatToDate(invite.expire_in, true)
                    )}
                  </InviteDuration>
                  <InviteUsage>
                    {t("usage_amount", { count: invite.usage_amount })}{" "}
                    {invite.is_unlimited_usage ? (
                      <MaterialCommunityIcons name="infinity" size={14} />
                    ) : (
                      invite.max_usage_amount
                    )}
                  </InviteUsage>
                </InviteLeftSide>
                <InviteRemoveButton>
                  <InviteRemoveText>
                    <Feather
                      name="x-circle"
                      onPress={() => handleDeleteInvite(invite.id)}
                      size={21}
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
