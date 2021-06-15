import { useNavigation } from "@react-navigation/core";
import React from "react";
import hero from "../../../assets/chatting.png";
import Button from "../../../components/Button";
import {
  ButtonContainer,
  ButtonsContainer,
  Container,
  HeroImage,
  ImageWrapper,
  Subtitle,
  Title,
  Wrapper,
} from "./styles";

const Home: React.FC = () => {
  const navigator = useNavigation();

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
          <HeroImage source={hero} />
        </ImageWrapper>
        <Title>Seja muito bem-vindo!</Title>
        <Subtitle>Tem muitas coisas legais te esperando no Flow Chat!</Subtitle>
        <ButtonsContainer>
          <ButtonContainer>
            <Button title="Criar conta" onPress={registerNavigate} />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title="Fazer login"
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
