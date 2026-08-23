import React, { memo, useCallback, useState, useMemo, useEffect } from "react";

import config from "@config";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import {
  GroupData,
  MessageData,
  ParticipantsData,
  UserData,
} from "@type/interfaces";

import * as Clipboard from "expo-clipboard";

import Alert from "@components/Alert";
import AudioPlayer from "@components/Chat/AudioPlayer";
import FilePreview from "@components/Chat/FilePreview";
import MessageOptions from "@components/MessageOptions";
import {
  Container,
  MessageAuthorContainer,
  MessageAvatar,
  MessageContentContainer,
  MessageDate,
  MessageDateContainer,
} from "./styles";
import PremiumName from "@components/PremiumName";
import { ParticipantRoles, ParticipantStates, ReportToType } from "@type/enums";
import { rolesForDeleteMessage } from "@utils/authorizedRoles";
import MessageMark from "@components/Markdown/MessageMark";
import SimpleToast from "react-native-simple-toast";

import { LinkUtils } from "@utils/link";
import { useAuth } from "@contexts/auth";

import isUndefined from "lodash/isUndefined";

import ReplyingMessage from "@components/Chat/ReplyingMessage";

import URLParser from "url-parse";
import InviteInMessage from "@components/Chat/RichContent/InviteInMessage";
import LinkPreview from "@components/Chat/RichContent/LinkPreview";
import { useChat } from "@contexts/chat";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useTranslate } from "@hooks/useTranslate";
import { usePremium } from "@contexts/premium";
import FastTranslator from "fast-mlkit-translate-text";
import { getLocales } from "expo-localization";

interface MessageProps {
  participant: ParticipantsData;
  message: MessageData;
  lastMessage: MessageData | null;
  onReplyMessage: (message: MessageData) => void;
  children?: React.ReactNode;
  group: GroupData;
  disableReply: boolean;
  participants: ParticipantsData[];
}

interface InvitesData {
  id: string;
}

// Instanciado fora do componente para evitar recriar o objeto a cada renderização
const linkUtils = new LinkUtils();

const Message = ({
  message,
  lastMessage,
  participant,
  onReplyMessage,
  group,
  disableReply,
  participants,
}: MessageProps) => {
  const [showLinkAlert, setShowLinkAlert] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [msgOptions, setMsgOptions] = useState(false);
  const [displayedMessageContent, setDisplayedMessageContent] = useState(
    message.message
  );
  const [hasInvite, setHasInvite] = useState(false);
  const [invitesData, setInvitesData] = useState<InvitesData[]>([]);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const { t } = useTranslate("Components.Chat.Message");

  const { handleDeleteMessage } = useChat();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setDisplayedMessageContent(message.message);
  }, [message.message]);

  const messageForDisplay = useMemo(
    () => ({
      ...message,
      message: displayedMessageContent,
    }),
    [message, displayedMessageContent]
  );

  const isRight = useMemo(() => {
    return message.author.id === user?.id;
  }, [message.author.id, user?.id]);

  const sended = useMemo(() => {
    return isUndefined(message?.sended) ? true : message.sended;
  }, [message.sended]);

  const handleGoParticipant = useCallback(() => {
    navigation.navigate("Participant", { participant: message.participant });
  }, [navigation, message.participant]);

  const formatHour = useCallback((date: string) => {
    return moment(date).format("DD/MM/yy, HH:mm");
  }, []);

  const renderAuthor = useCallback(() => {
    if (!lastMessage || lastMessage.author.id !== message.author.id) {
      const isAuthorUser = message.author?.id === user?.id;
      return (
        <MessageAuthorContainer
          onPress={handleGoParticipant}
          disabled={message.participant.state !== ParticipantStates.JOINED}
        >
          <MessageAvatar
            uri={message.author?.avatar?.url}
            placeholder={require("@assets/avatar-placeholder.jpg")}
            width={22}
            height={22}
          />
          <PremiumName
            name={message.author.name}
            nameSize={12}
            color={colors.light_heading}
            hasPremium={isAuthorUser ? isPremium : message.author.isPremium}
          />
        </MessageAuthorContainer>
      );
    }
    return <></>;
  }, [
    lastMessage?.author.id,
    message.author,
    message.participant.state,
    user?.id,
    isPremium,
    colors.light_heading,
    handleGoParticipant,
  ]);

  const renderDate = useCallback(() => {
    if (!lastMessage || lastMessage.author.id !== message.author.id) {
      return (
        <MessageDateContainer>
          <MessageDate>{formatHour(message.created_at)}</MessageDate>
        </MessageDateContainer>
      );
    } else {
      const isSameMinute =
        moment(message.created_at).minutes() ===
        moment(lastMessage.created_at).minutes();

      if (!isSameMinute) {
        return (
          <MessageDateContainer>
            <MessageDate>{formatHour(message.created_at)}</MessageDate>
          </MessageDateContainer>
        );
      }
      return <></>;
    }
  }, [lastMessage?.author.id, lastMessage?.created_at, message.author.id, message.created_at, formatHour]);

  const openLink = useCallback(
    async (passedLink = "") => {
      setShowLinkAlert(false);
      await linkUtils.openLink(passedLink || linkUrl);
      setLinkUrl("");
    },
    [linkUrl]
  );

  const alertLink = useCallback(
    async (link: string) => {
      const { hostname } = new URLParser(link);

      if (config.SATURN_CHAT_DOMAINS.includes(hostname)) {
        return await openLink(link);
      }

      setLinkUrl(link);
      setShowLinkAlert(true);
    },
    [openLink]
  );

  const closeLink = useCallback(() => {
    setLinkUrl("");
    setShowLinkAlert(false);
  }, []);

  const deleteMessage = useCallback(async () => {
    handleDeleteMessage({ message_id: message.id });
  }, [handleDeleteMessage, message.id]);

  const handleCopyMessage = useCallback(async () => {
    await Clipboard.setStringAsync(message.message);
    SimpleToast.show(t("toasts.copied_message"), SimpleToast.SHORT);
  }, [message.message, t]);

  const handleTranslateMessage = useCallback(async () => {
    if (displayedMessageContent !== message.message) {
      setDisplayedMessageContent(message.message);
      SimpleToast.show(t("toasts.original_restored"), SimpleToast.SHORT);
      return;
    }

    try {
      const messageLanguageTag = await FastTranslator.identify(message.message);
      const safeMessageLanguageTag =
        typeof messageLanguageTag === "string" ? messageLanguageTag : "";
      const messageLanguage = FastTranslator.languageFromTag(
        safeMessageLanguageTag
      );

      const userLanguage = FastTranslator.languageFromTag(
        getLocales()[0]?.languageCode || ""
      );

      if (!messageLanguage || !userLanguage) {
        SimpleToast.show(t("toasts.not_identified_lang"), SimpleToast.SHORT);
        return;
      }

      if (messageLanguage === userLanguage) {
        SimpleToast.show(t("toasts.already_in_lang"), SimpleToast.SHORT);
        return;
      }

      if (!(await FastTranslator.isLanguageDownloaded(userLanguage))) {
        await FastTranslator.downloadLanguageModel(userLanguage);
      }
      if (!(await FastTranslator.isLanguageDownloaded(messageLanguage))) {
        await FastTranslator.downloadLanguageModel(messageLanguage);
      }

      await FastTranslator.prepare({
        source: messageLanguage,
        target: userLanguage,
        downloadIfNeeded: true,
      });
      const translated = await FastTranslator.translate(message.message);

      setDisplayedMessageContent(translated);
      SimpleToast.show(t("toasts.translated_success"), SimpleToast.SHORT);
    } catch (error) {
      console.log("Translation error:", error);
      SimpleToast.show(
        "Erro ao traduzir mensagem. Tente novamente mais tarde.",
        SimpleToast.SHORT
      );
    }
  }, [displayedMessageContent, message.message, t]);

  const translateOptionContent = useMemo(
    () =>
      displayedMessageContent !== message.message
        ? t("options.show_original_message")
        : t("options.translate_message"),
    [displayedMessageContent, message.message, t]
  );

  const renderVoiceMessage = useCallback(() => {
    if (!message.voice_message) return <></>;
    return <AudioPlayer audio={message.voice_message} />;
  }, [message.voice_message]);

  const renderFiles = useCallback(() => {
    if (!message.files) return null;
    return message.files.map((file, idx) => (
      <FilePreview
        key={file.id || idx}
        name={file.name}
        original_name={file.original_name}
        url={file.url}
        size={file.size}
        type={file.type}
      />
    ));
  }, [message.files]);

  const renderInvites = useCallback(() => {
    if (!hasInvite || !message.links) return <></>;

    return (
      <>
        {invitesData.map((invite, index) => (
          <InviteInMessage key={`${invite.id}-${index}`} inviteID={invite.id} />
        ))}
      </>
    );
  }, [hasInvite, invitesData, message.links]);

  const renderLinks = useCallback(() => {
    if (!message.links) return <></>;

    return (
      <>
        {message.links.map((link, index) => {
          if (hasInvite) {
            const { host, pathname } = new URLParser(link.link);
            const { isInvite } = linkUtils.isInviteLink(host, pathname);
            if (isInvite) {
              return <></>;
            }
          }

          return <LinkPreview key={index} link={link} openLink={alertLink} />;
        })}
      </>
    );
  }, [message.links, hasInvite, alertLink]);

  const replyMessage = useCallback(
    (direction?: "right" | "left") => {
      if (disableReply) return;

      if (!direction) {
        onReplyMessage(message);
        return;
      }

      if (direction === "left" && isRight) return;
      if (direction === "right" && !isRight) return;

      onReplyMessage(message);
    },
    [disableReply, onReplyMessage, message, isRight]
  );

  const handleCloseMsgOptions = useCallback(() => setMsgOptions(false), []);
  const handleOpenMsgOptions = useCallback(() => setMsgOptions(true), []);

  const handleReportMessage = useCallback(async () => {
    navigation.navigate("Report", {
      type: ReportToType.MESSAGE,
      message_id: message.id,
    });
  }, [navigation, message.id]);

  useEffect(() => {
    const allLinks = linkUtils.getAllLinksFromText(message.message);
    const foundInvites: InvitesData[] = [];

    allLinks.forEach((link) => {
      const { host, pathname } = new URLParser(link);
      const { isInvite, inviteID } = linkUtils.isInviteLink(host, pathname);

      if (isInvite && inviteID) {
        foundInvites.push({ id: inviteID });
      }
    });

    if (foundInvites.length > 0) {
      setHasInvite(true);
      setInvitesData(foundInvites);
    }
  }, [message.message]);

  const optionsList = useMemo(
    () => [
      {
        iconName: "corner-up-right",
        content: t("options.reply"),
        action: replyMessage,
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
        showInDM: true,
        showForAuthor: true,
      },
      {
        iconName: "copy",
        content: t("options.copy"),
        action: handleCopyMessage,
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
        showInDM: true,
        showForAuthor: true,
      },
      {
        iconName: "globe",
        content: translateOptionContent,
        action: handleTranslateMessage,
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
        showInDM: true,
        showForAuthor: true,
      },
      {
        iconName: "user",
        content: t("options.part_opt"),
        action: handleGoParticipant,
        onlyOwner: false,
        authorizedRoles: ["ALL" as ParticipantRoles],
        showInDM: false,
        showForAuthor: true,
      },
      {
        iconName: "trash-2",
        content: t("options.delete"),
        action: deleteMessage,
        color: colors.red,
        onlyOwner: true,
        authorizedRoles: rolesForDeleteMessage,
        showInDM: true,
        showForAuthor: true,
      },
      {
        iconName: "alert-octagon",
        content: t("options.report"),
        action: handleReportMessage,
        color: colors.red,
        onlyOwner: false,
        authorizedRoles: ["ALL"],
        showInDM: true,
        showForAuthor: false,
      },
    ],
    [
      t,
      replyMessage,
      handleCopyMessage,
      translateOptionContent,
      handleTranslateMessage,
      handleGoParticipant,
      deleteMessage,
      colors.red,
      handleReportMessage,
    ]
  );

  return (
    <>
      <Alert
        title={t("alerts.open_link.title")}
        content={t("alerts.open_link.content", {
          url: linkUrl,
          interpolation: { escapeValue: false },
        })}
        cancelButtonText={t("alerts.open_link.cancel_text")}
        okButtonText={t("alerts.open_link.ok_text")}
        cancelButtonAction={closeLink}
        okButtonAction={openLink}
        visible={showLinkAlert}
      />
      <Swipeable
        overshootLeft={!isRight && !disableReply}
        overshootRight={isRight && !disableReply}
        overshootFriction={8}
        onSwipeableWillClose={(direction) => replyMessage(direction)}
        containerStyle={{ transform: [{ rotate: "180deg" }] }}
        cancelsTouchesInView
        enabled={!disableReply}
      >
        <Container isRight={isRight}>
          {message.reply_to && (
            <ReplyingMessage replying_message={message.reply_to} />
          )}
          <MessageContentContainer
            isRight={isRight}
            sended={sended}
            onLongPress={handleOpenMsgOptions}
            delayLongPress={200}
          >
            <MessageOptions
              close={handleCloseMsgOptions}
              visible={msgOptions}
              message={messageForDisplay}
              participant_role={participant.role}
              group={group}
              options={optionsList}
            />
            <MessageMark
              key={messageForDisplay.message}
              message={messageForDisplay}
              onPressLink={alertLink}
              user={user as UserData}
              participants={participants}
            />
            {renderVoiceMessage()}
            {renderFiles()}
          </MessageContentContainer>
          {renderInvites()}
          {renderLinks()}
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
    prev.message.sended === next.message.sended &&
    prev.message.message === next.message.message &&
    prev.disableReply === next.disableReply &&
    prev.lastMessage?.id === next.lastMessage?.id &&
    prev.participant.role === next.participant.role &&
    prev.participant.state === next.participant.state &&
    prev.participants.length === next.participants.length
  );
});