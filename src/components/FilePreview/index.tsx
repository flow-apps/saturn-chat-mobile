import React, { useCallback } from "react";
import {
  Container,
  FileContainer,
  FileDownloadButton,
  FileIconContainer,
  FileImagePreview,
  FileInfosContainer,
  FileName,
  FileOpenAction,
  FileSize,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import avatar from "../../assets/avatar.jpg";
import Alert from "../Alert";
import { useState } from "react";
import { convertBytesToMB } from "../../utils/convertSize";

interface IFileProps {
  name: string;
  url: string;
  size: number;
}

const FilePreview = ({ name, size, url }: IFileProps) => {
  const [downloadWarning, setDownloadWarning] = useState(false);
  const { colors } = useTheme();

  const handleDownloadFile = () => {
    setDownloadWarning(true);
  };

  const downloadFile = useCallback(() => {
    setDownloadWarning(false);

    // Código que executa o download
  }, []);

  return (
    <Container>
      <Alert
        title="❗ Muito cuidado"
        content={`Tem certeza que quer baixar o arquivo? Arquivos maliciosos podem danificar seu telefone!\n\n📁 Arquivo: ${name}`}
        visible={downloadWarning}
        cancelButtonText="Não baixar"
        okButtonText="Baixar"
        okButtonAction={downloadFile}
        cancelButtonAction={() => setDownloadWarning(false)}
      />
      <FileContainer>
        <FileIconContainer>
          <Feather name="image" size={40} color={colors.black} />
        </FileIconContainer>
        <FileInfosContainer>
          <FileName numberOfLines={1} lineBreakMode="middle">
            {name}
          </FileName>
          <FileSize>{convertBytesToMB(size)}MB</FileSize>
        </FileInfosContainer>
        <FileOpenAction>
          {name.split(".").reverse().shift() === "jpg" ? (
            <FileImagePreview source={{ uri: url }} />
          ) : (
            <FileDownloadButton onPress={handleDownloadFile}>
              <Feather name="download" size={30} color={colors.secondary} />
            </FileDownloadButton>
          )}
        </FileOpenAction>
      </FileContainer>
    </Container>
  );
};

export default React.memo(FilePreview);
