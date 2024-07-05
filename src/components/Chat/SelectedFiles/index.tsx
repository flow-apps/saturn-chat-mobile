import { DocumentResult } from "expo-document-picker";
import React from "react";
import SelectedFile from "@components/Chat/SelectedFile";
import {
  Files,
  FilesContainer,
} from "./styles";

interface File {
  file: DocumentResult;
  type: string;
}

interface SelectedFilesProps {
  files: File[];
  onFileRemove: (index: number) => any;
}

const SelectedFiles = ({ files, onFileRemove }: SelectedFilesProps) => {
  return (
    <>
      <FilesContainer
        from={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 100
        }}
      >
        <Files
          data={files}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => {
            return (
              <SelectedFile
                file={item}
                onRemoveFile={() => onFileRemove(index)}
              />
            );
          }}
        />
      </FilesContainer>
    </>
  );
};

export default React.memo(SelectedFiles);
