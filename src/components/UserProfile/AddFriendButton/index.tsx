import React from "react";
import { Feather } from "@expo/vector-icons";
import { FriendsStates } from "../../../../@types/enums";
import { FriendButton, FriendButtonText } from "./styles";

interface AddFriendButtonProps {
  friendsState?: FriendsStates;
  handleActionFriend: () => any;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  friendsState,
  handleActionFriend,
}) => {
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
        return "Amigos";
      case FriendsStates.REQUESTED:
        return "Solicitação enviada";
      default:
        return "Adicionar aos amigos";
    }
  };

  return (
    <FriendButton state={friendsState} onPress={handleActionFriend}>
      <FriendButtonText>
        {friendIconSelector()} {friendButtonTextSelector()}
      </FriendButtonText>
    </FriendButton>
  );
};

export default AddFriendButton;
