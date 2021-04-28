import React from "react";
import { TouchableOpacityProps } from "react-native";
import {
  Container,
  GroupInfos,
  GroupImage,
  GroupName,
  UnreadMessages,
  UnreadMessagesText,
} from "./styles";
import avatar from "../../assets/avatar.jpg";
import HorizontalLine from "../HorizontalLine";

export interface GroupProps extends TouchableOpacityProps {
  name: string;
  image?: string;
  unreadMessages: number;
}

const Group = ({ name, unreadMessages, image }: GroupProps) => {
  return (
    <>
      <Container>
        <GroupInfos>
          <GroupImage source={avatar} />
          <GroupName>{name}</GroupName>
        </GroupInfos>
        {unreadMessages > 0 && (
          <UnreadMessages>
            <UnreadMessagesText>{unreadMessages}</UnreadMessagesText>
          </UnreadMessages>
        )}
      </Container>
      <HorizontalLine />
    </>
  );
};

export default Group;
