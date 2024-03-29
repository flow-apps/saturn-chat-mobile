import React, { memo } from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import {
  Container,
  GroupInfos,
  GroupName,
  UnreadMessages,
  UnreadMessagesText,
  GroupImage,
} from "./styles";

interface GroupProps extends TouchableOpacityProps {
  name: string;
  image?: string;
  unreadMessages?: number;
}

const Group = ({ name, unreadMessages = 0, image, ...rest }: GroupProps) => {
  return (
    <>
      <Container as={TouchableOpacity} {...rest}>
        <GroupInfos>
          <GroupImage uri={image} />
          <GroupName numberOfLines={1}>{name}</GroupName>
        </GroupInfos>
        {unreadMessages > 0 && (
          <UnreadMessages>
            <UnreadMessagesText>
              {unreadMessages > 99 ? "99+" : unreadMessages}
            </UnreadMessagesText>
          </UnreadMessages>
        )}
      </Container>
    </>
  );
};

export default memo(Group);
