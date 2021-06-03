export interface UserData {
  id: string;
  name: string;
  email: string;
  created_at: string;
  avatar: {
    url: string;
  };
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  privacy: string;
  group_avatar: {
    url: string;
  };
  created_at: string;
}

export interface MessageData {
  id: string;
  message: string;
  created_at: string;
  author: UserData;
  group: GroupData;
}
