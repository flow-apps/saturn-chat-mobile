import React, { useMemo, useCallback, memo } from "react";
import Markdown, {
  MarkdownIt,
  RenderRules,
} from "react-native-markdown-display";
import { MessageData, UserData } from "@type/interfaces";
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

interface MessageMarkProps {
  user: UserData;
  message: MessageData;
  onPressLink: (url: string) => void;
}

const MessageMark = ({ user, message, onPressLink }: MessageMarkProps) => {
  const { t } = useTranslate("Components.Chat.LinkPreview")
  
  const markdownRules = MarkdownIt({
    linkify: true,
    typographer: true,
  })
    .disable(["image", "heading", "table", "list", "link", "blockquote", "hr"])
    .use(require("markdown-it-linkscheme"));

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
    };

    return rules;
  }, [message, user]);

  return (
    // @ts-ignore
    <Markdown markdownit={markdownRules} rules={renderRules} mergeStyle>
      {message.message}
    </Markdown>
  );
};

export default memo(MessageMark, (prev, next) => {
  return prev.message.id === next.message.id;
});
