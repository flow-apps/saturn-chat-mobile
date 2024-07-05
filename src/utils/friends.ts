import { FriendData } from "@type/interfaces";

export const getFriendID = (userID: string, friend: FriendData) => {
  return friend.received_by_id === userID
    ? friend.requested_by_id
    : friend.received_by_id;
};

export const getFriendAvatar = (userID: string, friend: FriendData) => {
  return friend.received_by_id === userID
    ? friend.requested_by.avatar?.url
    : friend.received_by.avatar?.url;
};

export const getFriendName = (userID: string, friend: FriendData) => {
  return friend.received_by_id === userID
    ? friend.requested_by.name
    : friend.received_by.name;
};

export const getFriendPremium = (userID: string, friend: FriendData) => {
  return friend.received_by_id === userID
    ? friend.requested_by.isPremium
    : friend.received_by.isPremium;
}
