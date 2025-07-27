import { Feather } from "@expo/vector-icons";
import { ParticipantRoles } from "@type/enums";
import { GroupData, MessageData } from "@type/interfaces";

export interface IOptions {
  content: string;
  action: () => unknown;
  onlyOwner: boolean;
  showInDM: boolean;
  iconName?: keyof typeof Feather.glyphMap;
  color?: string;
  authorizedRoles: ParticipantRoles[] | string[];
}

export interface IMessageOptionsProps {
  visible: boolean;
  message: MessageData;
  options: IOptions[];
  participant_role: ParticipantRoles;
  close: () => void;
  group: GroupData;
}