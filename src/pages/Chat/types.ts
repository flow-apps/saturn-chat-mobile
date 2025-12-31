import { TextInput } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ParticipantRoles } from "@type/enums";

export interface File {
  file: DocumentPicker.DocumentPickerAsset;
  type: string;
}

export interface TextInputRef extends TextInput {
  value: string;
}

export const ordernedRolesArray = [
  ParticipantRoles.PARTICIPANT,
  ParticipantRoles.MODERATOR,
  ParticipantRoles.MANAGER,
  ParticipantRoles.ADMIN,
  ParticipantRoles.OWNER
]