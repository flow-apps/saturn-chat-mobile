import React from "react";
import { File, ImageFile, OtherFile, RemoveFileButton } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { DocumentResult } from "expo-document-picker";

interface File {
  file: DocumentResult;
  type: string;
}

interface FileProps {
  file: File;
  onRemoveFile: () => any;
}

const SelectedFile = ({ onRemoveFile, file }: FileProps) => {
  const { colors } = useTheme();    

  return (
    <File
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
      }}
    >
      <RemoveFileButton onPress={onRemoveFile}>
        <Feather name="x" size={14} color={colors.secondary} />
      </RemoveFileButton>
      {file.file.type === "success" && file.type === "image" ? (
        <ImageFile source={{ uri: file.file.uri }}
          // @ts-ignore
          width={80}
          height={80}
          resizeMode="cover"
        />
      ) : (
        <OtherFile>
          <Feather name="file" size={25} color={colors.black} />
        </OtherFile>
      )}
    </File>
  );
};

export default React.memo(SelectedFile);
