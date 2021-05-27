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
  const [showAlert, setShowAlert] = useState(true);
  const handleOkButton = useCallback(() => {
    setShowAlert(false);

    if (okButtonAction) {
      return okButtonAction();
    }
  }, [okButtonAction]);

  const handleCancelButton = useCallback(() => {
    setShowAlert(false);

    if (cancelButtonAction) {
      return cancelButtonAction();
    }
  }, [cancelButtonAction]);

  return (
    <Container show={showAlert}>
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
