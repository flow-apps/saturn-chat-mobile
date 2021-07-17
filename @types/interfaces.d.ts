export interface UserData {
  id: string;
  name: string;
  email: string;
  participating: ParticipantsData[];
  created_at: string;
  avatar: {
    url: string;
  };
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  privacy: "PUBLIC" | "PRIVATE";
  tags: string[];
  group_avatar: {
    url: string;
  };
  owner: UserData;
  participantsAmount?: number;
  unreadMessagesAmount?: number;
  created_at: string;
}

export interface ParticipantsData {
  id: string;
  user: UserData;
  group: GroupData;
  participant_since: string;
}

export interface AudioData {
  url: string;
  size: number;
  duration: number;
}

export interface MessageData {
  id: string;
  message: string;
  created_at: string;
  author: UserData;
  group: GroupData;
  voice_message?: AudioData;
  files?: FileData[];
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
  id: string
  group_id: string
  invite_code: string
  is_permanent: boolean
  is_unlimited_usage: boolean
  max_usage_amount: number
  usage_amount: number
  expire_in: string
  expire_timezone: string
  created_at: string
}
