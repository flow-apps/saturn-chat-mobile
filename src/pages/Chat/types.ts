import { TextInput } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export interface File {
  file: DocumentPicker.DocumentResult;
  type: string;
}

export interface TextInputRef extends TextInput {
  value: string;
}