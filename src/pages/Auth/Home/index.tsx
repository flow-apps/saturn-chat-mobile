import { useNavigation } from "@react-navigation/core";
import React from "react";
import Button from "../../../components/Button";
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

const Home: React.FC = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();

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
        <Title>Vamos começar?</Title>
        <Subtitle>Acesse ou crie sua conta para começar a usar o app!</Subtitle>
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
