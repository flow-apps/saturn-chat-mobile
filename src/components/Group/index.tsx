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
          {image ? (
            <GroupImage
              source={{ 
                uri: image,
                cache: "immutable",
                priority: "high"
              }}
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
