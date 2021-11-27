import React from "react";
import Header from "../../../components/Header";
import * as Localize from "expo-localization";
import {
  Feather,
  FontAwesome,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
import { useRemoteConfigs } from "../../../contexts/remoteConfigs";

import { connectAsync } from "expo-in-app-purchases";

const Premium: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { allConfigs } = useRemoteConfigs();

  const handleGoChoosePlan = () => navigation.navigate("ChoosePlan");

  return (
    <>
      <Header title="Faça parte da constelação!" />
      <Container>
        <ContentWrapper>
          <StarContainer>
            <StarAnimation
              source={require("../../../assets/star-2.json")}
              speed={0.7}
              autoPlay
            />
            <StarTitle>
              <Feather name="star" size={22} /> Seja uma Star!
            </StarTitle>
          </StarContainer>
          <TitleWrapper>
            <Title>
              Ganhe vantagens e recursos incríveis do Saturn Chat por um custo
              que cabe no seu bolso!
            </Title>
          </TitleWrapper>
          <SubtitleWrapper>
            <Subtitle>
              Aproveite ao máximo todos os recursos disponíveis como envio de
              arquivos maiores, criar mais grupos, remover todos os anúncios, e
              mais!
            </Subtitle>
          </SubtitleWrapper>
          <BuyWrapper>
            <BuyBonusText>Assine agora e ganhe 1 mês grátis!</BuyBonusText>
            <BuyButton onPress={handleGoChoosePlan}>
              <BuyButtonText>
                <Feather name="star" size={18} /> Obter a partir de R$ 39
                {Localize.decimalSeparator}99
              </BuyButtonText>
            </BuyButton>
          </BuyWrapper>
          <VantagesWrapper>
            <VantagesTitle>Vantagens do plano Star:</VantagesTitle>
            <VantagesContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    {" "}
                    <FontAwesome name="ban" size={26} color={colors.red} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Totalmente livre de anúncios chatos!
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="file" size={26} color={colors.primary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Aumente em{" "}
                  {Math.round(
                    Number(allConfigs.premium_file_upload) /
                      Number(allConfigs.default_file_upload)
                  )}
                  x o espaço para envio de arquivos, de{" "}
                  {allConfigs.default_file_upload}MB para incríveis{" "}
                  {allConfigs.premium_file_upload}MB de envio.
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="users" size={26} color="#CC5214" />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Aumente a quantidade de grupos que você pode criar de{" "}
                  {allConfigs.default_max_groups} para{" "}
                  {allConfigs.premium_max_groups} grupos.
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
                  Aumente a quantidade de participantes que você pode ter em
                  seus grupos de {allConfigs.default_max_participants} para{" "}
                  {allConfigs.premium_max_participants} participantes.
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="star" size={28} color={colors.secondary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Ganhe um selo exclusivo ao lado do seu nome para sair
                  ostentando!
                </VantageContent>
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
                  Gosta de textões? Então aumente suas mensagens de{" "}
                  {allConfigs.default_max_message_length} caracteres para
                  maravilhosos {allConfigs.premium_max_message_length}{" "}
                  caracteres!
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
                <VantageContent>
                  Apoie o desenvolvimento do aplicativo e a trazer muitas
                  novidades ❤
                </VantageContent>
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
                <VantageContent>
                  Exporte as mensagens de seus grupos em formato CSV.
                </VantageContent>
              </VantageContainer>
            </VantagesContainer>
          </VantagesWrapper>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Premium;
