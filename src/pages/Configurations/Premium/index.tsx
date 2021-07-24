import React from "react";
import Header from "../../../components/Header";
import * as Localize from "expo-localization";
import { Feather, FontAwesome, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
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

const Premium: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header title="Faça parte da constelação!" backButton />
      <Container>
        <ContentWrapper>
          <StarContainer>
            <StarAnimation
              source={require("../../../assets/star-2.json")}
              speed={0.7}
              autoPlay
            />
            <StarTitle>
              <Feather name="star" size={22} /> Seja uma Estrela!
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
              arquívos maiores, criar grupos ilimitados, remover todos os
              anúncios, e mais!
            </Subtitle>
          </SubtitleWrapper>
          <BuyWrapper>
            <BuyBonusText>Assine e ganhe 1 mês grátis!</BuyBonusText>
            <BuyButton>
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
                    {" "}<FontAwesome name="ban" size={26} color={colors.red} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>Totalmente livre de anúncios chatos!</VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="file" size={26} color={colors.primary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Aumente em 10x o espaço para envio de arquivos, de 12MB para incríveis 120MB de envio.
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="users" size={26} color="#CC5214" />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                   Aumente a quantidade de grupos que você pode criar de 2 para
                  20 grupos.
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="plus-circle" size={26} color={colors.light_primary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                   Aumente a quantidade de participantes que você pode ter em
                  seus grupos de 1000 para 50{Localize.digitGroupingSeparator}
                  000 participantes.
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <Feather name="star" size={28} color={colors.secondary} />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Ganhe um selo exclusivo ao lado do seu nome para sair ostentando!
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    <MaterialCommunityIcons name="dev-to" size={28} color="#FF5E0D" />
                  </VantageIcon>
                </VantageIconContainer>
                <VantageContent>
                  Apoie o desenvolvimento do aplicativo e a trazer muitas novidades ❤
                </VantageContent>
              </VantageContainer>
              <VantageContainer>
                <VantageIconContainer>
                  <VantageIcon>
                    {" "}<Foundation name="page-export-csv" size={30} color={colors.green} />
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
