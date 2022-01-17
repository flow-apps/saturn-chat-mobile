import React, { useMemo, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import {
  Container,
  FieldError,
  FieldInfo,
  FieldInfoContainer,
  FormContainer,
  InputContainer,
} from "./styles";

const SwitchPassword: React.FC = () => {
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [passError, setPassError] = useState(true);
  const [confirmPassError, setConfirmPassError] = useState(true);

  const handleSetNewPassword = (value: string) => {
    setNewPass(value);

    if (!passwordValidation.test(value)) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };

  const handleSetConfirmNewPassword = (value: string) => {
    setConfirmNewPass(value);

    if (newPass !== value) {
      setConfirmPassError(true);
    } else {
      setConfirmPassError(false);
    }
  };

  return (
    <>
      <Header title="Altere sua senha" />
      <Container>
        <FormContainer>
          <InputContainer>
            <Input
              value={currentPass}
              label="Senha atual"
              textContentType="password"
              onChangeText={setCurrentPass}
              secureTextEntry
            />
          </InputContainer>
          <InputContainer>
            <Input
              value={newPass}
              label="Nova senha"
              textContentType="password"
              onChangeText={handleSetNewPassword}
              secureTextEntry
            />
            {passError && !!newPass && (
              <FieldError>A senha não segue os padrões segurança</FieldError>
            )}
            <FieldInfoContainer>
              <FieldInfo>
                Sua senha deve conter: no mínimo 8 caracteres (sendo ao menos 1
                letra maiúsculo), pelo menos 1 número e pelo menos 1 símbolo
              </FieldInfo>
            </FieldInfoContainer>
          </InputContainer>
          <InputContainer>
            <Input
              value={confirmNewPass}
              label="Confirme a nova senha"
              textContentType="password"
              onChangeText={handleSetConfirmNewPassword}
              secureTextEntry
            />
            {confirmPassError && !!confirmNewPass && (
              <FieldError>As senhas não combinam</FieldError>
            )}
          </InputContainer>
          <Button
            title="Alterar senha"
            enabled={!passError && !confirmPassError && !!currentPass}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default SwitchPassword;
