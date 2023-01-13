import { FriendsStates, ParticipantRoles, ParticipantStates } from "./enums";

export interface UserData {
  id: string;
  name: string;
  bio: string;
  email: string;
  groups: GroupData[];
  friendsAmount?: number;
  participating?: ParticipantsData[];
  created_at: string;
  avatar: {
    name: string;
    url: string;
  };
}

export interface FriendData {
  id: string;
  chat: GroupData;
  unreadMessagesAmount?: number;
  requested_by: UserData;
  received_by: UserData;
  received_by_id: string;
  requested_by_id: string;
  state: FriendsStates;
  created_at: string;
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  privacy: "PUBLIC" | "PRIVATE";
  type: "GROUP" | "DIRECT";
  tags: string[];
  group_avatar: {
    name: string;
    url: string;
  };
  owner_id: string;
  owner: UserData;
  participantsAmount?: number;
  unreadMessagesAmount?: number;
  created_at: string;
}

export interface ParticipantsData {
  id: string;
  user: UserData;
  group: GroupData;
  status: "ONLINE" | "OFFLINE";
  role: ParticipantRoles;
  state: ParticipantStates;
  participating_since: string;
}

export interface AudioData {
  name: string;
  url: string;
  size: number;
  duration: number;
}

export interface MessageData {
  id: string;
  message: string;
  links?: LinkData[];
  created_at: string;
  author: UserData;
  participant: ParticipantsData;
  group: GroupData;
  reply_to?: MessageData;
  voice_message?: AudioData;
  files?: FileData[];
  sended?: boolean;
  localReference?: string;
}

export interface FileData {
  id: string;
  name: string;
  original_name: string;
  url: string;
  size: number;
  type: "unknown" | string;
}

export interface InviteData {
  id: string;
  friend_id?: string;
  sended_by?: UserData;
  friend?: FriendData;
  group_id: string;
  group: GroupData;
  invite_code: string;
  is_permanent: boolean;
  is_unlimited_usage: boolean;
  max_usage_amount: number;
  usage_amount: number;
  expire_in: string;
  expire_timezone: string;
  created_at: string;
}

export interface LinkData {
  link: string;
  siteName: string;
  title: string;
  description: string;
  favicon: string;
  image: string;
}
