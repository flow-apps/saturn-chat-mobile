import React, { memo, useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Container,
  AlertButtonsContainer,
  AlertContainer,
  AlertContent,
  AlertOkButton,
  AlertModal,
  AlertTitle,
  AlertOkButtonText,
  AlertCancelButton,
  AlertCancelButtonText,
} from "./styles";
import { TouchableWithoutFeedback } from "react-native";

interface AlertProps {
  title: string;
  content: string;
  okButtonText?: string;
  cancelButtonText?: string;
  okButtonAction?: () => any;
  cancelButtonAction?: () => any;
}

const Alert = ({
  title,
  content,
  okButtonText,
  cancelButtonText,
  okButtonAction,
  cancelButtonAction,
}: AlertProps) => {
  const handleOkButton = useCallback(() => {
    if (okButtonAction) {
      return okButtonAction();
    }
  }, [okButtonAction]);

  const handleCancelButton = useCallback(() => {
    if (cancelButtonAction) {
      return cancelButtonAction();
    }
  }, [cancelButtonAction]);

  return (
    <Container>
      <StatusBar backgroundColor="#000" animated style="light" />
      <AlertContainer>
        <AlertModal>
          <AlertTitle>{title}</AlertTitle>
          <AlertContent>{content}</AlertContent>
          <AlertButtonsContainer>
            <AlertOkButton onPress={handleOkButton}>
              <AlertOkButtonText>
                {okButtonText ? okButtonText : "OK"}
              </AlertOkButtonText>
            </AlertOkButton>
            {cancelButtonAction ? (
              <AlertCancelButton onPress={handleCancelButton}>
                <AlertCancelButtonText>
                  {cancelButtonText ? cancelButtonText : "Cancelar"}
                </AlertCancelButtonText>
              </AlertCancelButton>
            ) : (
              <></>
            )}
          </AlertButtonsContainer>
        </AlertModal>
      </AlertContainer>
    </Container>
  );
};

export default memo(Alert);
