import { Feather } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components";
import { FriendData } from "../../../../@types/interfaces";

interface FriendRequestProps {
  friend: FriendData;
  OpenUserProfile: (userID: string) => void;
  handleAcceptOrRejectFriend: (
    friendID: string,
    state: "ACCEPT" | "REJECT"
  ) => Promise<void>;
}

import {
  FriendRequestContainer,
  FriendRequestLeftContainer,
  FriendRequestAvatar,
  FriendRequestName,
  FriendRequestRightContainer,
  FriendRequestActionButton,
} from "./styles";

const FriendRequest: React.FC<FriendRequestProps> = ({
  friend,
  OpenUserProfile,
  handleAcceptOrRejectFriend,
}) => {
  const { colors } = useTheme();

  return (
    <FriendRequestContainer
      onPress={() => OpenUserProfile(friend.requested_by.id)}
    >
      <FriendRequestLeftContainer>
        <FriendRequestAvatar uri={friend.requested_by.avatar.url} />
        <FriendRequestName numberOfLines={1} ellipsizeMode="middle">
          {friend.requested_by.name}
        </FriendRequestName>
      </FriendRequestLeftContainer>
      <FriendRequestRightContainer>
        <FriendRequestActionButton
          onPress={() => handleAcceptOrRejectFriend(friend.id, "ACCEPT")}
        >
          <Feather name="check" size={24} color={colors.primary} />
        </FriendRequestActionButton>
        <FriendRequestActionButton
          onPress={() => handleAcceptOrRejectFriend(friend.id, "REJECT")}
        >
          <Feather name="x" size={24} color={colors.red} />
        </FriendRequestActionButton>
      </FriendRequestRightContainer>
    </FriendRequestContainer>
  );
};

export default FriendRequest;
