import { TextInput } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export interface File {
  file: DocumentPicker.DocumentPickerAsset;
  type: string;
}

export interface TextInputRef extends TextInput {
  value: string;
}