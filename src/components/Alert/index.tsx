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
  visible: boolean;
}

const Alert = ({
  title,
  content,
  okButtonText,
  cancelButtonText,
  okButtonAction,
  cancelButtonAction,
  visible,
}: AlertProps) => {
  const handleOkButton = useCallback(() => {
    if (okButtonAction) {
      return okButtonAction();
    }
  }, [okButtonAction]);

  const handleCancelButton = useCallback(() => {
    visible = false;
    if (cancelButtonAction) {
      return cancelButtonAction();
    }
  }, [cancelButtonAction]);

  return (
    <Container
      visible={visible}
      onRequestClose={cancelButtonAction}
      onDismiss={cancelButtonAction}
      animationType="fade"
      transparent
    >
      <StatusBar backgroundColor="#000" animated style="light" />
      <TouchableWithoutFeedback onPress={cancelButtonAction}>
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
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default memo(Alert);
