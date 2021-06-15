import React, { useState } from "react";
import {
  ConfigContainer,
  ConfigsContainer,
  ConfigTitle,
  Container,
  SectionContainer,
  SectionsContainer,
  SectionTitle,
} from "./styles";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/auth";
import { Feather } from "@expo/vector-icons";
import Switcher from "../../components/Switcher";
import { useToggleTheme } from "../../contexts/theme";

const Configurations: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, currentThemeName } = useToggleTheme();

  return (
    <>
      <Header title="Configurações" />
      <Container>
        <SectionsContainer>
          <SectionContainer>
            <SectionTitle>Geral</SectionTitle>
            <ConfigsContainer>
              <ConfigContainer>
                <ConfigTitle>
                  <Feather name="moon" size={16} /> Modo Escuro
                </ConfigTitle>
                <Switcher
                  currentValue={currentThemeName === "dark"}
                  onChangeValue={toggleTheme}
                />
              </ConfigContainer>
            </ConfigsContainer>
          </SectionContainer>
        </SectionsContainer>
      </Container>
    </>
  );
};

export default Configurations;
