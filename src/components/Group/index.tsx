import React, { memo } from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import {
  Container,
  GroupInfos,
  GroupImage,
  GroupName,
  UnreadMessages,
  UnreadMessagesText,
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
          {image ? (
            <GroupImage
              defaultSource={require("../../assets/avatar-placeholder.png")}
              source={{ uri: image }}
              width={70}
              height={70}
            />
          ) : (
            <GroupImage
              source={require("../../assets/avatar-placeholder.png")}
            />
          )}
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
