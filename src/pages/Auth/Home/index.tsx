import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import Button from "@components/Button";
import {
  Container,
  ButtonContainer,
  ButtonsContainer,
  HeroImage,
  ImageWrapper,
  Subtitle,
  Title,
  Wrapper,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";

const Home: React.FC = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("Auth.Home")

  async function registerNavigate() {
    navigator.navigate("Register");
  }

  async function loginNavigate() {
    navigator.navigate("Login");
  }

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <HeroImage 
            source={require("../../../assets/auth.json")}
            loop={false}
            autoPlay
          />
        </ImageWrapper>
        <Title>{t("title")}</Title>
        <Subtitle>{t("subtitle")}</Subtitle>
        <ButtonsContainer>
          <ButtonContainer>
            <Button title={t("new_account")} onPress={registerNavigate} />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title={t("login")}
              textColor="#0088ff"
              bgColor="transparent"
              onPress={loginNavigate}
            />
          </ButtonContainer>
        </ButtonsContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
