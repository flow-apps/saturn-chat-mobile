import React, { useCallback, useState } from "react";
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
import { useThemeController } from "../../contexts/theme";
import Button from "../../components/Button";
import { useTheme } from "styled-components";
import Alert from "../../components/Alert";

const Configurations: React.FC = () => {
  const { signOut } = useAuth();
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const { toggleTheme, currentThemeName } = useThemeController();
  const { colors } = useTheme();

  const handleSignOut = useCallback(() => {
    setConfirmSignOut(true);
  }, []);

  return (
    <>
      <Header title="Configurações" />
      <Container>
        <Alert
          visible={confirmSignOut}
          title="😥 Quer mesmo sair?"
          content="Ao sair você não receberá notificações de novas mensagens, convites e nada relacionado."
          cancelButtonText="Cancelar"
          okButtonText="Sair"
          cancelButtonAction={() => setConfirmSignOut(false)}
          okButtonAction={signOut}
        />
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
              <Button
                title="Sair da conta"
                bgColor={colors.red}
                onPress={handleSignOut}
              />
            </ConfigsContainer>
          </SectionContainer>
        </SectionsContainer>
      </Container>
    </>
  );
};

export default Configurations;
