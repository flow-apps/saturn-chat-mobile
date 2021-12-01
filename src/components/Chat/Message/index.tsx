import React, { memo, useCallback, useState, useMemo } from "react";

import isSameMinute from "date-fns/isSameMinute";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { convertToTimeZone } from "date-fns-timezone";

import { useNavigation } from "@react-navigation/native";
import { Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import {
  MessageData,
  ParticipantsData,
  UserData,
} from "../../../../@types/interfaces";

import * as Localize from "expo-localization";
import * as Clipboard from "expo-clipboard";
import { Swipeable } from "react-native-gesture-handler";

import Alert from "../../Alert";
import AudioPlayer from "../AudioPlayer";
import FilePreview from "../FilePreview";
import MessageOptions, { IOptions } from "../../MessageOptions";
import {
  Container,
  MessageAuthorContainer,
  MessageAvatar,
  MessageContentContainer,
  MessageDate,
  MessageDateContainer,
} from "./styles";
import PremiumName from "../../PremiumName";
import { ParticipantRoles } from "../../../../@types/enums";
import { rolesForDeleteMessage } from "../../../utils/authorizedRoles";
import MessageMark from "../../Markdown/MessageMark";
import SimpleToast from "react-native-simple-toast";
import { LinkUtils } from "../../../utils/link";
import _ from "lodash";
import { useAuth } from "../../../contexts/auth";
import ReplyingMessage from "../ReplyingMessage";

interface MessageProps {
  participant: ParticipantsData;
  message: MessageData;
  lastMessage: MessageData | null;
  index: number;
  socket: Socket;
  onReplyMessage: (message: MessageData) => void;
}

const Message = ({
  message,
  lastMessage,
  participant,
  index,
  socket,
  onReplyMessage,
}: MessageProps) => {
  const [showLinkAlert, setShowLinkAlert] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [msgOptions, setMsgOptions] = useState(false);
  const { user } = useAuth();
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const navigation = useNavigation();
  const isRight = useMemo(() => {
    return message.author.id === user?.id;
  }, []);

  const sended = useMemo(() => {
    return _.isUndefined(message?.sended) ? true : message.sended;
  }, []);

  const messageOptions = useMemo<IOptions[]>(() => {
    return [
      {
        iconName: "corner-up-right",
        content: "Responder",
        action: () => onReplyMessage(message),
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
      },
      {
        iconName: "copy",
        content: "Copiar",
        action: handleCopyMessage,
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
      },
      {
        iconName: "trash-2",
        content: "Excluir",
        action: deleteMessage,
        color: colors.red,
        onlyOwner: true,
        authorizedRoles: rolesForDeleteMessage,
      },
    ];
  }, []);

  const handleGoParticipant = () => {
    navigation.navigate("Participant", { participant: message.participant });
  };

  const renderAuthor = useCallback(() => {
    if (!lastMessage || lastMessage.author.id !== message.author.id) {

      return (
        <MessageAuthorContainer onPress={handleGoParticipant}>
          {message.author.avatar ? (
            <MessageAvatar
              source={{
                uri: message.author.avatar.url,
                cache: "immutable",
                priority: "high",
              }}
            />
          ) : (
            <MessageAvatar
              source={require("../../../assets/avatar-placeholder.png")}
            />
          )}
          <PremiumName
            name={message.author.name}
            nameSize={12}
            color={colors.light_heading}
          />
        </MessageAuthorContainer>
      );
    }
  }, [message, lastMessage])

  const renderDate = useCallback(() => {
    if (!lastMessage || lastMessage.author.id !== message.author.id) {
      return (
        <MessageDateContainer>
          <MessageDate>{formatHour(message.created_at)}</MessageDate>
        </MessageDateContainer>
      );
    } else {
      const date = (date: string) => parseISO(date);
      const same = isSameMinute(
        date(message.created_at),
        date(lastMessage.created_at)
      );

      if (!same) {
        return (
          <MessageDateContainer>
            <MessageDate>{formatHour(message.created_at)}</MessageDate>
          </MessageDateContainer>
        );
      } else {
        return <></>;
      }
    }
  }, []);

  const formatHour = useCallback((date: string) => {
    const isoDate = parseISO(date);
    const tzDate = convertToTimeZone(isoDate, {
      timeZone: Localize.timezone,
    });

    return format(tzDate, "dd/MM/yy, HH:mm");
  }, []);

  const deleteMessage = useCallback(() => {
    socket.emit("delete_user_message", message.id);
  }, [message.id]);

  const alertLink = useCallback((url: string) => {
    setLinkUrl(url);
    setShowLinkAlert(true);
  }, []);

  const openLink = useCallback(async () => {
    setShowLinkAlert(false);

    await linkUtils.openLink(linkUrl);

    setLinkUrl("");
  }, [linkUrl]);

  const closeLink = useCallback(() => {
    setLinkUrl("");
    return setShowLinkAlert(false);
  }, [linkUrl]);

  const handleCopyMessage = useCallback(() => {
    Clipboard.setString(message.message);
    SimpleToast.show("Mensagem copiada");
  }, [message.message]);

  const renderFiles = useCallback(() => {
    if (message.files) {
      return message.files.map((file) => {
        return (
          <FilePreview
            key={file.id}
            name={file.original_name}
            url={file.url}
            size={file.size}
            type={file.type}
          />
        );
      });
    }
  }, [message.files]);

  const handleCloseMsgOptions = () => setMsgOptions(false);
  const handleOpenMsgOptions = () => setMsgOptions(true);

  return (
    <>
      <Alert
        title="⚠ Cuidado, pode ser perigoso"
        content={`Tem certeza que quer acessar este link? Não podemos garantir sua segurança ao acessá-lo. \n\n${linkUrl}`}
        cancelButtonText="Não"
        okButtonText="Acessar"
        cancelButtonAction={closeLink}
        okButtonAction={openLink}
        visible={showLinkAlert}
      />
      <Swipeable
        overshootRight={isRight}
        overshootLeft={!isRight}
        onSwipeableWillClose={() => onReplyMessage(message)}
        shouldCancelWhenOutside={true}
        useNativeAnimations={true}
        friction={4}
      >
        <Container key={index} isRight={isRight} style={{ scaleY: -1 }}>
          {/* <ReplyingMessage /> */}
          <MessageContentContainer
            isRight={isRight}
            sended={sended}
            onLongPress={handleOpenMsgOptions}
            delayLongPress={250}
          >
            <MessageOptions
              close={handleCloseMsgOptions}
              visible={msgOptions}
              message={message}
              participant_role={participant.role}
              options={messageOptions}
            />
            <MessageMark
              message={message}
              onPressLink={alertLink}
              user={user as UserData}
            />
            {message.voice_message && (
              <AudioPlayer audio={message.voice_message} />
            )}
            {renderFiles()}
          </MessageContentContainer>
          {renderDate()}
          {renderAuthor()}
        </Container>
      </Swipeable>
    </>
  );
};

export default memo(Message, (prev, next) => {
  return (
    prev.message.id === next.message.id &&
    prev.message.message === next.message.message &&
    prev.lastMessage?.id === next.lastMessage?.id
  );
});
