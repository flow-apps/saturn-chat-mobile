import React, { useMemo, useCallback, memo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Markdown, {
  MarkdownIt,
  RenderRules,
} from "react-native-markdown-display";
import { MessageData, UserData, ParticipantsData } from "@type/interfaces";
import { MessageContent } from "@components/Chat/Message/styles";
import {
  MessageCodeBlock,
  MessageCodeBlockText,
  MessageCodeInline,
  MessageLink,
} from "./styles";

import * as Clipboard from "expo-clipboard";
import SimpleToast from "react-native-simple-toast";
import { useTranslate } from "@hooks/useTranslate";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface MessageMarkProps {
  user: UserData;
  message: MessageData;
  onPressLink: (url: string) => void;
  participants: ParticipantsData[];
}

const MAX_MESSAGE_LENGTH = 200;

const markdownItInstance = MarkdownIt({
  linkify: true,
  typographer: true,
}).disable(["image", "heading", "table", "list", "blockquote", "hr"]);

const MessageMark = ({
  user,
  message,
  onPressLink,
  participants,
}: MessageMarkProps) => {
  const { t } = useTranslate("Components.Chat.LinkPreview");
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [isExpanded, setIsExpanded] = useState(false);

  const rawText = message.message || "";
  const isLongMessage = rawText.length > MAX_MESSAGE_LENGTH;

  const displayedText = useMemo(() => {
    if (!isLongMessage || isExpanded) return rawText;
    return `${rawText.substring(0, MAX_MESSAGE_LENGTH)}... `;
  }, [rawText, isLongMessage, isExpanded]);

  const copyLink = useCallback(async (url: string) => {
    await Clipboard.setStringAsync(url);
    SimpleToast.show(t("link_copied"), SimpleToast.SHORT);
  }, []);

  const renderRules = useMemo(() => {
    const rules: RenderRules = {
      paragraph: (node, children) => (
        <MessageContent isRight={message.author.id === user.id} key={node.key}>
          {children}
        </MessageContent>
      ),
      link: (node, children) => (
        <MessageLink
          onPress={() => onPressLink(node.attributes.href)}
          onLongPress={() => copyLink(node.attributes.href)}
          key={node.key}
        >
          {children}
        </MessageLink>
      ),
      code_inline: (node) => (
        <MessageCodeInline key={node.key}>{node.content}</MessageCodeInline>
      ),
      fence: (node) => {
        let { content } = node;

        if (
          typeof node.content === "string" &&
          node.content.charAt(node.content.length - 1) === "\n"
        ) {
          content = node.content.substring(0, node.content.length - 1);
        }

        return (
          <MessageCodeBlock key={node.key}>
            <MessageCodeBlockText>{content}</MessageCodeBlockText>
          </MessageCodeBlock>
        );
      },
      text: (node) => {
        const content = node.content;
        const mentionRegex = /(@\w+)/g;

        if (!mentionRegex.test(content)) {
          return node.content;
        }

        const parts = content.split(mentionRegex);
        return (
          <Text key={node.key}>
            {parts.map((part, index) => {
              if (part.startsWith("@")) {
                const nickname = part.substring(1);
                const participant = participants?.find(
                  (p) => p.user?.nickname === nickname,
                );

                if (participant) {
                  return (
                    <MessageLink
                      key={`mention-${index}`}
                      onPress={() =>
                        navigation.navigate("UserProfile", {
                          id: participant.user.id,
                        })
                      }
                    >
                      {part}
                    </MessageLink>
                  );
                }
              }
              return <Text key={`text-${index}`}>{part}</Text>;
            })}
          </Text>
        );
      },
    };

    return rules;
  }, [message, user, participants, navigation, onPressLink, copyLink]);

  return (
    <>
      {/* @ts-ignore */}
      <Markdown markdownit={markdownItInstance} rules={renderRules} mergeStyle>
        {displayedText}
      </Markdown>

      {isLongMessage && (
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={{ marginTop: 4, alignSelf: "flex-start" }}
        >
          <Text
            style={{
              color: user.id === message.author.id ? "#E0F2FE" : "#0284C7",
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            {isExpanded ? "Ler menos" : "Ler mais"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default memo(MessageMark, (prev, next) => {
  return (
    prev.message.id === next.message.id &&
    prev.message.message === next.message.message
  );
});
