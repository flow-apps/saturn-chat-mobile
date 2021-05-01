import React, { memo } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";

interface GroupProps extends TouchableOpacity {
  name: string;
  image?: string;
  unreadMessages?: number;
}

const Group = ({ name, unreadMessages = 0, image, ...rest }: GroupProps) => {
  return (
    <>
      <Container {...rest}>
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

export default memo(Group);
