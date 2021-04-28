import React from "react";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../../components/Header";

import {
  Container,
  SelectGroupPhotoContainer,
  SelectGroupPhoto,
  SelectGroupPhotoTitle,
  SelectGroupPhotoSubtitle,
  FormContainer,
  Form,
  Input,
  SwitcherContainer,
  SwitcherText,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Switcher from "../../components/Switcher/Switcher";
import Button from "../../components/Button";

const NewGroup: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header title="Novo grupo" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SelectGroupPhotoContainer>
              <SelectGroupPhoto>
                <Feather name="camera" size={55} color={colors.secondary} />
              </SelectGroupPhoto>
              <SelectGroupPhotoTitle>Escolha uma foto</SelectGroupPhotoTitle>
              <SelectGroupPhotoSubtitle>
                Recomendamos uma imagem de 300x300
              </SelectGroupPhotoSubtitle>
            </SelectGroupPhotoContainer>
            <FormContainer
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Form>
                <Input
                  placeholder="Nome do grupo"
                  maxLength={100}
                  returnKeyType="go"
                />
                <Input
                  placeholder="Descrição do grupo"
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                />
                <SwitcherContainer>
                  <SwitcherText>
                    <Feather
                      name="users"
                      size={30}
                      color={colors.light_heading}
                    />{" "}
                    Tornar público
                  </SwitcherText>
                  <Switcher />
                </SwitcherContainer>
              </Form>
              <Button title="Cria Grupo" />
            </FormContainer>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default NewGroup;
