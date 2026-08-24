import React, {
  memo,
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { View } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import * as Clipboard from "expo-clipboard";
import SimpleToast from "react-native-simple-toast";
import URLParser from "url-parse";
import FastTranslator from "fast-mlkit-translate-text";
import { getLocales } from "expo-localization";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Feather from "@expo/vector-icons/Feather";

import config from "@config";
import {
  GroupData,
  MessageData,
  ParticipantsData,
  UserData,
} from "@type/interfaces";
import { ParticipantRoles, ParticipantStates, ReportToType } from "@type/enums";
import { rolesForDeleteMessage } from "@utils/authorizedRoles";
import { LinkUtils } from "@utils/link";
import { useAuth } from "@contexts/auth";
import { useChat } from "@contexts/chat";
import { useTranslate } from "@hooks/useTranslate";
import { usePremium } from "@contexts/premium";

import Alert from "@components/Alert";
import AudioPlayer from "@components/Chat/AudioPlayer";
import FilePreview from "@components/Chat/FilePreview";
import MessageOptions from "@components/Chat/MessageOptions";
import PremiumName from "@components/PremiumName";
import MessageMark from "@components/Markdown/MessageMark";
import ReplyingMessage from "@components/Chat/ReplyingMessage";
import InviteInMessage from "@components/Chat/RichContent/InviteInMessage";
import LinkPreview from "@components/Chat/RichContent/LinkPreview";

import {
  Container,
  MessageAuthorContainer,
  MessageAvatar,
  MessageContentContainer,
  MessageDate,
  MessageDateContainer,
} from "./styles";

import { PollMessage } from "@components/PollMessage";

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

const linkUtils = new LinkUtils();

const MessageAuthorHeader = memo(
  ({
    author,
    participantState,
    isPremium,
    headingColor,
    isAuthorUser,
    onPress,
  }: {
    author: MessageData["author"];
    participantState?: ParticipantStates;
    isPremium: boolean;
    headingColor: string;
    isAuthorUser: boolean;
    onPress: () => void;
  }) => (
    <MessageAuthorContainer
      onPress={onPress}
      disabled={participantState !== ParticipantStates.JOINED}
    >
      <MessageAvatar
        uri={author?.avatar?.url}
        placeholder={require("@assets/avatar-placeholder.jpg")}
        width={22}
        height={22}
      />
      <PremiumName
        name={author?.name || ""}
        nameSize={12}
        color={headingColor}
        hasPremium={isAuthorUser ? isPremium : author?.isPremium}
      />
    </MessageAuthorContainer>
  ),
);

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
  const [translatedContent, setTranslatedContent] = useState<string | null>(
    null,
  );
  const [invitesData, setInvitesData] = useState<InvitesData[]>([]);

  const swipeableRef = useRef<SwipeableMethods>(null);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const { t } = useTranslate("Components.Chat.Message");

  const { handleDeleteMessage } = useChat();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTranslatedContent(null);
  }, [message.id, message.localReference]);

  useEffect(() => {
    const text = message.message;
    if (!text || !text.includes("http")) {
      if (invitesData.length > 0) setInvitesData([]);
      return;
    }

    const allLinks = linkUtils.getAllLinksFromText(text);
    const foundInvites: InvitesData[] = [];

    for (let i = 0; i < allLinks.length; i++) {
      const { host, pathname } = new URLParser(allLinks[i]);
      const { isInvite, inviteID } = linkUtils.isInviteLink(host, pathname);
      if (isInvite && inviteID) {
        foundInvites.push({ id: inviteID });
      }
    }

    setInvitesData(foundInvites);
  }, [message.message]);

  const isRight = message.author?.id === user?.id;
  const isSended = message?.sended ?? true;
  const hasInvite = invitesData.length > 0;

  const currentText = translatedContent ?? message.message;

  const handleGoParticipant = useCallback(() => {
    navigation.navigate("Participant", { participant: message.participant });
  }, [navigation, message.participant]);

  const openLink = useCallback(
    async (passedLink = "") => {
      setShowLinkAlert(false);
      await linkUtils.openLink(passedLink || linkUrl);
      setLinkUrl("");
    },
    [linkUrl],
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
    [openLink],
  );

  const closeLink = useCallback(() => {
    setLinkUrl("");
    setShowLinkAlert(false);
  }, []);

  const deleteMessage = useCallback(async () => {
    handleDeleteMessage({ message_id: message.id });
  }, [handleDeleteMessage, message.id]);

  const handleCopyMessage = useCallback(async () => {
    await Clipboard.setStringAsync(currentText);
    SimpleToast.show(t("toasts.copied_message"), SimpleToast.SHORT);
  }, [currentText, t]);

  const handleTranslateMessage = useCallback(async () => {
    if (translatedContent !== null) {
      setTranslatedContent(null);
      SimpleToast.show(t("options.original_restored"), SimpleToast.SHORT);
      return;
    }

    try {
      const messageLanguageTag = await FastTranslator.identify(message.message);
      const safeMessageLanguageTag =
        typeof messageLanguageTag === "string" ? messageLanguageTag : "";
      const messageLanguage = FastTranslator.languageFromTag(
        safeMessageLanguageTag,
      );

      const userLanguage = FastTranslator.languageFromTag(
        getLocales()[0]?.languageCode || "",
      );

      if (!messageLanguage || !userLanguage) {
        SimpleToast.show(t("options.not_identified_lang"), SimpleToast.SHORT);
        return;
      }

      if (messageLanguage === userLanguage) {
        SimpleToast.show(t("options.already_in_lang"), SimpleToast.SHORT);
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

      if (translated) {
        setTranslatedContent(translated);
        SimpleToast.show(t("options.translated_success"), SimpleToast.SHORT);
      }
    } catch (error) {
      console.log("Erro ao traduzir mensagem: ", error);
      SimpleToast.show(
        "Erro ao traduzir mensagem. Tente novamente mais tarde.",
        SimpleToast.SHORT,
      );
    }
  }, [translatedContent, message.message, t]);

  const triggerReply = useCallback(() => {
    swipeableRef.current?.close();
    onReplyMessage(message);
  }, [onReplyMessage, message]);

  const renderReplyIcon = useCallback(
    () => (
      <View
        style={{ width: 50, justifyContent: "center", alignItems: "center" }}
      >
        <Feather name="corner-up-right" size={20} color={colors.secondary} />
      </View>
    ),
    [colors.secondary],
  );

  const handleCloseMsgOptions = useCallback(() => setMsgOptions(false), []);
  const handleOpenMsgOptions = useCallback(() => setMsgOptions(true), []);

  const handleReportMessage = useCallback(async () => {
    navigation.navigate("Report", {
      type: ReportToType.MESSAGE,
      message_id: message.id,
    });
  }, [navigation, message.id]);

  const optionsList = useMemo(
    () => [
      {
        iconName: "corner-up-right",
        content: t("options.reply"),
        action: triggerReply,
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
        content:
          translatedContent !== null
            ? t("options.show_original_message")
            : t("options.translate_message"),
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
        showInDM: true,
        showForAuthor: false,
      },
    ],
    [
      t,
      triggerReply,
      handleCopyMessage,
      translatedContent,
      handleTranslateMessage,
      handleGoParticipant,
      deleteMessage,
      colors.red,
      handleReportMessage,
    ],
  );

  const isSameAuthorAsLast = lastMessage?.author?.id === message.author?.id;

  console.log(message)
  

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
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={80}
        overshootLeft={false}
        overshootRight={false}
        renderLeftActions={!isRight ? renderReplyIcon : undefined}
        renderRightActions={isRight ? renderReplyIcon : undefined}
        onSwipeableWillOpen={triggerReply}
        containerStyle={{ transform: [{ rotate: "180deg" }] }}
        enabled={!disableReply}
      >
        <Container isRight={isRight}>
          {message.reply_to && (
            <ReplyingMessage replying_message={message.reply_to} />
          )}

          <MessageContentContainer
            isRight={isRight}
            sended={isSended}
            onLongPress={handleOpenMsgOptions}
            delayLongPress={200}
          >
            <MessageOptions
              close={handleCloseMsgOptions}
              visible={msgOptions}
              message={{
                ...message,
                message: currentText,
              }}
              participant_role={participant.role}
              group={group}
              options={optionsList as any}
            />
            {message.message ? (
              <MessageMark
                key={`${message.id}-${translatedContent ? "translated" : "original"}`}
                message={{
                  ...message,
                  message: currentText,
                }}
                onPressLink={alertLink}
                user={user as UserData}
                participants={participants}
              />
            ) : null}

            {message.poll && (
              <PollMessage poll={message.poll} groupId={group.id} />
            )}

            {message.voice_message && (
              <AudioPlayer audio={message.voice_message} />
            )}
            {message.files &&
              message.files.map((file, idx) => (
                // @ts-ignore
                <FilePreview
                  // @ts-ignore
                  key={file.id || idx}
                  name={file.name}
                  // @ts-ignore
                  original_name={file.original_name}
                  // @ts-ignore
                  url={file.url}
                  size={file.size}
                  type={file.type}
                />
              ))}
          </MessageContentContainer>

          {hasInvite &&
            invitesData.map((invite, index) => (
              <InviteInMessage
                key={`${invite.id}-${index}`}
                inviteID={invite.id}
              />
            ))}

          {message.links &&
            message.links.map((link, index) => {
              if (hasInvite) {
                const { host, pathname } = new URLParser(link.link);
                const { isInvite } = linkUtils.isInviteLink(host, pathname);
                if (isInvite) return null;
              }
              return (
                <LinkPreview
                  key={link.id || index}
                  link={link}
                  openLink={alertLink}
                />
              );
            })}

          {(!isSameAuthorAsLast ||
            moment(message.created_at).minutes() !==
              moment(lastMessage?.created_at).minutes()) && (
            <MessageDateContainer>
              <MessageDate>
                {moment(message.created_at).format("DD/MM/yy, HH:mm")}
              </MessageDate>
            </MessageDateContainer>
          )}

          {!isSameAuthorAsLast && (
            <MessageAuthorHeader
              author={message.author}
              participantState={message.participant?.state}
              isPremium={isPremium}
              headingColor={colors.light_heading}
              isAuthorUser={isRight}
              onPress={handleGoParticipant}
            />
          )}
        </Container>
      </ReanimatedSwipeable>
    </>
  );
};

export default memo(Message, (prev, next) => {
  return (
    prev.message.id === next.message.id &&
    prev.message.localReference === next.message.localReference &&
    prev.message.sended === next.message.sended &&
    prev.message.author?.id === next.message.author?.id &&
    prev.disableReply === next.disableReply &&
    prev.lastMessage?.id === next.lastMessage?.id &&
    prev.participant?.role === next.participant?.role &&
    prev.participant?.state === next.participant?.state &&
    prev.participants === next.participants &&
    JSON.stringify(prev.message.poll) === JSON.stringify(next.message.poll)
  );
});
