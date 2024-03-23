import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { FriendsStates } from "../../../../@types/enums";
import { FriendButton, FriendButtonText } from "./styles";
import { useTranslate } from "../../../hooks/useTranslate";

interface AddFriendButtonProps {
  friendsState?: FriendsStates;
  handleActionFriend: () => any;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  friendsState,
  handleActionFriend,
}) => {

  const { t } = useTranslate("Components.AddFriendButton")

  const friendIconSelector = () => {
    switch (friendsState) {
      case FriendsStates.REQUESTED:
        return <Feather name="user" size={16} />;
      case FriendsStates.FRIENDS:
        return <Feather name="user-check" size={16} />;
      default:
        return <Feather name="user-plus" size={16} />;
    }
  };

  const friendButtonTextSelector = () => {
    switch (friendsState) {
      case FriendsStates.FRIENDS:
        return t("friends");
      case FriendsStates.REQUESTED:
        return t("requested");
      default:
        return t("request");
    }
  };

  return (
    <FriendButton
      state={friendsState}
      onPress={handleActionFriend}
      disabled={friendsState === FriendsStates.FRIENDS}
    >
      <FriendButtonText>
        {friendIconSelector()} {friendButtonTextSelector()}
      </FriendButtonText>
    </FriendButton>
  );
};

export default AddFriendButton;
