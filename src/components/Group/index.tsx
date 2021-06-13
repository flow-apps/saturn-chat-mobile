import React, { memo } from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import {
  Container,
  GroupInfos,
  GroupImage,
  GroupName,
  UnreadMessages,
  UnreadMessagesText,
  HLWrapper,
} from "./styles";
import HorizontalLine from "../HorizontalLine";

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
          <GroupImage source={{ uri: image }} />
          <GroupName numberOfLines={1}>{name}</GroupName>
        </GroupInfos>
        {unreadMessages > 0 && (
          <UnreadMessages>
            <UnreadMessagesText>{unreadMessages}</UnreadMessagesText>
          </UnreadMessages>
        )}
      </Container>
    </>
  );
};

export default memo(Group);
