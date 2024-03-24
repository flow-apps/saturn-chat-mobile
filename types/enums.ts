export enum ParticipantRoles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MODERATOR = "MODERATOR",
  PARTICIPANT = "PARTICIPANT",
}

export enum ParticipantStates {
  JOINED = "JOINED",
  EXITED = "EXITED",
  BANNED = "BANNED",
  KICKED = "KICKED",
}

export enum FriendsStates {
  NONE = "NONE",
  REQUESTED = "REQUESTED",
  FRIENDS = "FRIENDS",
}

export enum NotificationsTypes {
  CHAT_MESSAGE = "CHAT_MESSAGE"
}
