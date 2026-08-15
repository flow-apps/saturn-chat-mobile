import { UserData } from "@type/interfaces";

export interface MentionsProps {
  query: string;
  groupId: string;
  onUserSelect: (user: UserData) => void;
}

export interface MentionUser extends UserData {
}
