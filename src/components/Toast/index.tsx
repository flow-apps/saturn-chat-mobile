import React, { memo, useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Container,
  ToastButtonsContainer,
  ToastContainer,
  ToastContent,
  ToastOkButton,
  ToastModal,
  ToastTitle,
  ToastOkButtonText,
  ToastCancelButton,
  ToastCancelButtonText,
} from "./styles";

interface ToastProps {
  title: string;
  content: string;
  okButtonText?: string;
  cancelButtonText?: string;
  okButtonAction?: () => any;
  cancelButtonAction?: () => any;
}

const Toast = ({
  title,
  content,
  okButtonText,
  cancelButtonText,
  okButtonAction,
  cancelButtonAction,
}: ToastProps) => {
  const [showToast, setShowToast] = useState(true);
  const handleOkButton = useCallback(() => {
    setShowToast(false);

    if (okButtonAction) {
      return okButtonAction();
    }
  }, [okButtonAction]);

  const handleCancelButton = useCallback(() => {
    setShowToast(false);

    if (cancelButtonAction) {
      return cancelButtonAction();
    }
  }, [cancelButtonAction]);

  return (
    <Container show={showToast}>
      <StatusBar backgroundColor="#000" animated style="light" />
      <ToastContainer>
        <ToastModal>
          <ToastTitle>{title}</ToastTitle>
          <ToastContent>{content}</ToastContent>
          <ToastButtonsContainer>
            <ToastOkButton onPress={handleOkButton}>
              <ToastOkButtonText>
                {okButtonText ? okButtonText : "OK"}
              </ToastOkButtonText>
            </ToastOkButton>
            {cancelButtonAction ? (
              <ToastCancelButton onPress={handleCancelButton}>
                <ToastCancelButtonText>
                  {cancelButtonText ? cancelButtonText : "Cancelar"}
                </ToastCancelButtonText>
              </ToastCancelButton>
            ) : (
              <></>
            )}
          </ToastButtonsContainer>
        </ToastModal>
      </ToastContainer>
    </Container>
  );
};

export default memo(Toast);
