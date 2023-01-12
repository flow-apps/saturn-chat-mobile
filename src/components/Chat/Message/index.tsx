import React, { memo, useCallback, useState, useMemo, useEffect } from "react";

import config from "../../../config";
import isSameMinute from "date-fns/isSameMinute";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { convertToTimeZone } from "date-fns-timezone";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import {
  MessageData,
  ParticipantsData,
  UserData,
} from "../../../../@types/interfaces";

import * as Localize from "expo-localization";
import * as Clipboard from "expo-clipboard";

import Alert from "../../Alert";
import AudioPlayer from "../AudioPlayer";
import FilePreview from "../FilePreview";
import MessageOptions from "../../MessageOptions";
import {
  Container,
  MessageAuthorContainer,
  MessageAvatar,
  MessageContentContainer,
  MessageDate,
  MessageDateContainer,
} from "./styles";
import PremiumName from "../../PremiumName";
import { ParticipantRoles, ParticipantStates } from "../../../../@types/enums";
import { rolesForDeleteMessage } from "../../../utils/authorizedRoles";
import MessageMark from "../../Markdown/MessageMark";
import SimpleToast from "react-native-simple-toast";
import { LinkUtils } from "../../../utils/link";
import _ from "lodash";
import { useAuth } from "../../../contexts/auth";
import ReplyingMessage from "../ReplyingMessage";
import { useAudioPlayer } from "../../../contexts/audioPlayer";

import URLParser from "url-parse";
import InviteInMessage from "../RichContent/InviteInMessage";
import LinkPreview from "../RichContent/LinkPreview";
import { MotiView } from "moti";
import { ArrayUtils } from "../../../utils/array";
import { useChat } from "../../../contexts/chat";

interface MessageProps {
  participant: ParticipantsData;
  message: MessageData;
  lastMessage: MessageData | null;
  onReplyMessage: (message: MessageData) => void;
  children?: React.ReactNode;
}

interface InvitesData {
  id: string;
}

const Message = ({
  message,
  lastMessage,
  participant,
  onReplyMessage,
}: MessageProps) => {
  const [showLinkAlert, setShowLinkAlert] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [msgOptions, setMsgOptions] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [hasInvite, setHasInvite] = useState(false);
  const [invitesData, setInvitesData] = useState<InvitesData[]>([]);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { unloadAudio } = useAudioPlayer();

  const { handleDeleteMessage } = useChat();

  const linkUtils = new LinkUtils();
  const arrayUtils = new ArrayUtils();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isRight = useMemo(() => {
    return message.author.id === user?.id;
  }, [message, user]);

  const sended = useMemo(() => {
    return _.isUndefined(message?.sended) ? true : message.sended;
  }, [message]);

  useEffect(() => {
    (async () => {
      const allLinks = linkUtils.getAllLinksFromText(message.message);

      allLinks.map((link) => {
        const { host, pathname } = new URLParser(link);
        if (!config.SATURN_CHAT_DOMAINS.includes(host)) return;
        if (!pathname) return;

        const partsOfPath = pathname.split("/").filter(Boolean);

        if (partsOfPath.includes("invite")) {
          if (partsOfPath.length !== 2) return;

          if (!hasInvite) {
            setHasInvite(true);
          }

          const inviteID = partsOfPath.pop();
          setInvitesData((old) => [...old, { id: inviteID }]);
        }
      });
    })();
  }, []);

  const handleGoParticipant = () => {
    navigation.navigate("Participant", { participant: message.participant });
  };

  const renderAuthor = useCallback(() => {
    if (!lastMessage || lastMessage.author.id !== message.author.id) {
      return (
        <MessageAuthorContainer
          onPress={handleGoParticipant}
          disabled={message.participant.state !== ParticipantStates.JOINED}
        >
          <MessageAvatar uri={message.author.avatar?.url} />
          <PremiumName
            name={message.author.name}
            nameSize={12}
            color={colors.light_heading}
          />
        </MessageAuthorContainer>
      );
    }
  }, [message, lastMessage]);

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
  }, [message, lastMessage]);

  const formatHour = useCallback((date: string) => {
    const isoDate = parseISO(date);
    const tzDate = convertToTimeZone(isoDate, {
      timeZone: Localize.timezone,
    });

    return format(tzDate, "dd/MM/yy, HH:mm");
  }, []);

  const deleteMessage = useCallback(async () => {
    const files = message.files;
    if (files) {
      const processedMessages = arrayUtils.iterator(files, async (f) => {
        if (f.type === "audio") {
          await unloadAudio(f.name);
        }
      });
      await Promise.all(processedMessages);
    }

    if (message.voice_message) {
      await unloadAudio(message.voice_message.name);
    }

    handleDeleteMessage({ message_id: message.id });
    setDeleted(true);
  }, [message]);

  const alertLink = useCallback(
    async (link: string) => {
      const { hostname } = new URLParser(link);

      if (config.SATURN_CHAT_DOMAINS.includes(hostname)) {
        return await openLink(link);
      }

      setLinkUrl(link);
      setShowLinkAlert(true);
    },
    [message]
  );

  const openLink = useCallback(
    async (passedLink = "") => {
      setShowLinkAlert(false);

      await linkUtils.openLink(passedLink || linkUrl);

      setLinkUrl("");
    },
    [linkUrl]
  );

  const closeLink = useCallback(() => {
    setLinkUrl("");
    return setShowLinkAlert(false);
  }, [linkUrl]);

  const handleCopyMessage = useCallback(async () => {
    await Clipboard.setStringAsync(message.message);
    SimpleToast.show("Mensagem copiada");
  }, [message.message]);

  const renderVoiceMessage = useCallback(() => {
    if (!message.voice_message) return <></>;

    return <AudioPlayer audio={message.voice_message} deleted={deleted} />;
  }, [message.voice_message]);

  const renderFiles = useCallback(() => {
    if (message.files) {
      return message.files.map((file) => {
        return (
          <FilePreview
            key={file.id}
            name={file.name}
            original_name={file.original_name}
            url={file.url}
            size={file.size}
            type={file.type}
            deleted={deleted}
          />
        );
      });
    }
  }, [message.files, deleted]);

  const renderInvites = useCallback(() => {
    if (!hasInvite) return <></>;

    return (
      <>
        {invitesData.map((invite, index) => (
          <InviteInMessage key={index} inviteID={invite.id} />
        ))}
      </>
    );
  }, [hasInvite, invitesData]);

  const renderLinks = useCallback(() => {
    if (!message.links) return <></>;

    return (
      <>
        {message.links.map((link, index) => (
          <LinkPreview key={index} link={link} openLink={alertLink} />
        ))}
      </>
    );
  }, [message.links]);

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
      <MotiView
        from={{
          scale: sended ? 1 : 0.5,
          translateX: sended ? 0 : !isRight ? -150 : 150,
        }}
        animate={{ scale: 1, translateX: 0 }}
        transition={{
          type: "timing",
          duration: 400,
        }}
      >
        <Container isRight={isRight} >
          {message.reply_to && (
            <ReplyingMessage replying_message={message.reply_to} />
          )}
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
              options={[
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
              ]}
            />
            <MessageMark
              message={message}
              onPressLink={alertLink}
              user={user as UserData}
            />
            {renderVoiceMessage()}
            {renderFiles()}
          </MessageContentContainer>
          {renderInvites()}
          {renderLinks()}
          {renderDate()}
          {renderAuthor()}
        </Container>
      </MotiView>
    </>
  );
};

export default memo(Message, (prev, next) => {
  return (
    prev.message.id === next.message.id
  );
});
