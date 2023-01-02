import React, { memo, useCallback } from "react";

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
  AlertExtraButton,
  AlertExtraButtonText,
} from "./styles";
import { TouchableWithoutFeedback } from "react-native";

interface AlertProps {
  title: string;
  content: string;
  okButtonText?: string;
  cancelButtonText?: string;
  extraButtonText?: string;
  okButtonAction?: () => any;
  cancelButtonAction?: () => any;
  extraButtonAction?: () => any;
  extraButton?: boolean;
  visible: boolean;
}

const Alert = ({
  title,
  content,
  okButtonText,
  cancelButtonText,
  okButtonAction,
  cancelButtonAction,
  extraButton = true,
  extraButtonText,
  extraButtonAction,
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

  const handleExtraButton = useCallback(() => {
    visible = false;
    if (extraButtonAction) {
      return extraButtonAction();
    }
  }, [extraButtonAction]);

  return (
    <Container
      visible={visible}
      onRequestClose={cancelButtonAction}
      onDismiss={cancelButtonAction}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
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
              {
                extraButton ? (
                  <AlertExtraButton onPress={handleExtraButton}>
                    <AlertExtraButtonText>{extraButtonText}</AlertExtraButtonText>
                  </AlertExtraButton>
                ) : (
                  <></>
                )
              }
            </AlertButtonsContainer>
          </AlertModal>
        </AlertContainer>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default memo(Alert);
