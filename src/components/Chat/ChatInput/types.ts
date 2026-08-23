import * as DocumentPicker from "expo-document-picker";

export interface File {
  file: DocumentPicker.DocumentPickerAsset;
  type: string;
}
