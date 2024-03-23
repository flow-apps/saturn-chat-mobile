import React from "react";
import Header from "../../../components/Header";
import * as Localize from "expo-localization";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Container,
  ContentWrapper,
  StarContainer,
  StarAnimation,
  Subtitle,
  SubtitleWrapper,
  Title,
  TitleWrapper,
  StarTitle,
  BuyButton,
  BuyButtonText,
  BuyWrapper,
  BuyBonusText,
  VantagesWrapper,
  VantagesTitle,
  VantagesContainer,
  VantageContainer,
  VantageIconContainer,
  VantageIcon,
  VantageContent,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRemoteConfigs } from "../../../contexts/remoteConfigs";
import { useTranslate } from "../../../hooks/useTranslate";

const Premium: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();
  const { allConfigs } = useRemoteConfigs();
  const { t } = useTranslate("Premium");

  const handleGoChoosePlan = () => navigation.navigate("ChoosePlan");

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <ContentWrapper>
          <StarContainer>
            <StarAnimation
              source={require("../../../assets/star-2.json")}
              speed={0.7}
              autoPlay
            />
            <StarTitle>
              <Feather name="star" size={22} /> {t("be_star")}
            </StarTitle>
          </StarContainer>
          <TitleWrapper>
            <Title>{t("title")}</Title>
          </TitleWrapper>
          <SubtitleWrapper>
            <Subtitle>{t("subtitle")}</Subtitle>
          </SubtitleWrapper>
          <BuyWrapper>
            <BuyBonusText>{t("free_month")}</BuyBonusText>
            <BuyButton onPress={handleGoChoosePlan}>
              <BuyButtonText>
                <Feather name="star" size={18} />{" "}
                {t("buy_button", {
                  price: `R$ 19${Localize.getLocales()[0].decimalSeparator}99`,
                })}
              </BuyButtonText>
            </BuyButton>
          </BuyWrapper>
          <VantagesWrapper>
            <VantagesTitle>{t("vantages_title")}</VantagesTitle>
            <VantagesContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    {" "}
                    <FontAwesome name="ban" size={26} color={colors.red} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>{t("advantages.0")}</VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="file" size={26} color={colors.primary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  {t("advantages.1", {
                    multiple: Math.round(
                      Number(allConfigs.premium_file_upload) /
                        Number(allConfigs.default_file_upload)
                    ),
                    default: allConfigs.default_file_upload,
                    premium: allConfigs.premium_file_upload,
                  })}
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="users" size={26} color="#CC5214" />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  {t("advantages.2", {
                    default: allConfigs.default_max_groups,
                    premium: allConfigs.premium_max_groups,
                  })}
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather
                      name="plus-circle"
                      size={26}
                      color={colors.light_primary}
                    />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  {t("advantages.3", {
                    default: allConfigs.default_max_participants,
                    premium: allConfigs.premium_max_participants,
                  })}
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="star" size={28} color={colors.secondary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>{t("advantages.4")}</VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <MaterialCommunityIcons
                      name="cursor-text"
                      size={28}
                      color="#FF0055"
                    />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  {t("advantages.5", {
                    default: allConfigs.default_max_message_length,
                    premium: allConfigs.premium_max_message_length,
                  })}
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <MaterialCommunityIcons
                      name="dev-to"
                      size={28}
                      color="#FF5E0D"
                    />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>{t("advantages.6")}</VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    {" "}
                    <Foundation
                      name="page-export-csv"
                      size={30}
                      color={colors.green}
                    />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>{t("advantages.7")}</VantageContent>
              </VantageContainer>
            </VantagesContainer>
          </VantagesWrapper>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Premium;
