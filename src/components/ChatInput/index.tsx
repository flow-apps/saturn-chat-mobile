import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { ProgressBar } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import SimpleToast from "react-native-simple-toast";

import { UserData, MessageData } from "@type/interfaces";
import { File } from "./types";
import SelectedFiles from "@components/Chat/SelectedFiles";
import CurrentReplyingMessage from "@components/Chat/CurrentReplyingMessage";
import Mentions from "@components/Chat/Mentions";
import RecordingAudio from "@components/Chat/RecordingAudio";

import {
  AudioButton,
  AudioContainer,
  FileSendedProgressContainer,
  FileSendedText,
  FormContainer,
  InputContainer,
  MessageInput,
  NoSendMessageContainer,
  NoSendMessageText,
  OptionsButton,
  OptionsContainer,
  SendButton,
} from "./styles";

interface ChatInputProps {
  groupId: string;
  canSendMessage: boolean;
  maxMessageLength: number;
  replyingMessage?: MessageData;
  sendingFile: boolean;
  sendedFileProgress: number;
  isRecording: boolean;
  audioDuration: number;
  onSendMessage: (message: string, files: File[], mentions: string[]) => void;
  onRecordAudioStart: (hasMessage: boolean) => void;
  onRecordAudioStop: () => void;
  onFileSelect: () => void;
  onRemoveFile: (index: number) => void;
  onRemoveReplying: () => void;
  onTyping: () => void;
  onTypingTimeout: () => void;
  files: File[];
  insetsBottom: number;
  isKeyboardVisible: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  groupId,
  canSendMessage,
  maxMessageLength,
  replyingMessage,
  sendingFile,
  sendedFileProgress,
  isRecording,
  audioDuration,
  onSendMessage,
  onRecordAudioStart,
  onRecordAudioStop,
  onFileSelect,
  onRemoveFile,
  onRemoveReplying,
  onTyping,
  onTypingTimeout,
  files,
  insetsBottom,
  isKeyboardVisible,
}) => {
  const { colors } = useTheme();
  const messageInputRef = useRef<{
    value?: string;
    clear: () => void;
    focus: () => void;
    setNativeProps: (p: any) => void;
  }>(null);

  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [isMentioning, setIsMentioning] = useState(false);
  const [mentions, setMentions] = useState<UserData[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [mentionPosition, setMentionPosition] = useState({ start: 0, end: 0 });

  const handleSetText = (text: string) => {
    if (text.length >= maxMessageLength) {
      return SimpleToast.show(
        `Limite de ${maxMessageLength} caracteres atingido.`,
        SimpleToast.SHORT,
      );
    }
    setIsTypingMessage(text.length > 0);

    const match = /@(\w+)/g.exec(text);
    if (
      match &&
      cursorPosition >= match.index &&
      cursorPosition <= match.index + match[0].length
    ) {
      setMentionQuery(match[1]);
      setMentionPosition({
        start: match.index,
        end: match.index + match[0].length,
      });
      setIsMentioning(true);
    } else {
      setIsMentioning(false);
    }

    setMentions((prev) => prev.filter((m) => text.includes(`@${m.nickname}`)));
    if (messageInputRef.current) messageInputRef.current.value = text;
    onTyping();
  };

  const handleUserSelect = (selectedUser: UserData) => {
    const text = messageInputRef.current?.value || "";
    const newText = `${text.substring(0, mentionPosition.start)}@${selectedUser.nickname} ${text.substring(mentionPosition.end)}`;

    if (messageInputRef.current) {
      messageInputRef.current.setNativeProps({ text: newText });
      messageInputRef.current.value = newText;
    }

    setMentions((prev) => [...prev, selectedUser]);
    setIsMentioning(false);
    setIsTypingMessage(true);
    onTyping();
    messageInputRef.current?.focus();
  };

  const handleSubmit = () => {
    const text = messageInputRef.current?.value || "";
    if (files.length === 0 && !text) return;

    if (messageInputRef.current) {
      messageInputRef.current.clear();
      messageInputRef.current.value = "";
    }

    setIsTypingMessage(false);
    onSendMessage(
      text,
      files,
      mentions.map((m) => m.id),
    );
    setMentions([]);
  };

  if (!canSendMessage) {
    return (
      <NoSendMessageContainer>
        <NoSendMessageText>
          Você não pode enviar mensagens nesse grupo, mas ainda pode vê-las e
          receber notificações.
        </NoSendMessageText>
      </NoSendMessageContainer>
    );
  }

  return (
    <FormContainer
      style={{
        paddingHorizontal: 12,
        paddingBottom: isKeyboardVisible
          ? 8
          : insetsBottom > 0
            ? insetsBottom - 40
            : 12,
      }}
    >
      {isMentioning && (
        <Mentions
          query={mentionQuery}
          groupId={groupId}
          onUserSelect={handleUserSelect}
        />
      )}

      <AnimatePresence>
        {isRecording && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <RecordingAudio audioDuration={audioDuration} />
          </MotiView>
        )}
      </AnimatePresence>

      {files.length > 0 && !sendingFile && (
        <SelectedFiles files={files} onFileRemove={onRemoveFile} />
      )}

      {sendingFile && (
        <FileSendedProgressContainer>
          <FileSendedText>
            <Feather name="upload" size={16} /> {sendedFileProgress}% Enviado
          </FileSendedText>
          <ProgressBar
            progress={sendedFileProgress / 100}
            color={colors.primary}
            style={{ minWidth: "100%", height: 10, borderRadius: 10 }}
          />
        </FileSendedProgressContainer>
      )}

      <AnimatePresence>
        {replyingMessage && (
          <CurrentReplyingMessage
            message={replyingMessage}
            onRemoveReplying={onRemoveReplying}
          />
        )}
      </AnimatePresence>

      <InputContainer>
        <MessageInput
          // @ts-ignore
          ref={messageInputRef}
          as={TextInput}
          cursorColor={colors.secondary}
          placeholderTextColor={colors.dark_heading}
          onChangeText={handleSetText}
          onSelectionChange={({ nativeEvent: { selection } }) =>
            setCursorPosition(selection.start)
          }
          maxLength={maxMessageLength}
          placeholder={
            isRecording ? "Solte para enviar" : "Digite uma mensagem..."
          }
        />
        <OptionsContainer>
          <OptionsButton onPress={onFileSelect}>
            <Feather name="file" size={24} color={colors.primary} />
          </OptionsButton>
          {isTypingMessage || files.length > 0 ? (
            <SendButton>
              <Feather
                name="send"
                size={26}
                color={colors.primary}
                onPress={handleSubmit}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </SendButton>
          ) : (
            <AudioContainer>
              <AudioButton
                onPressIn={() =>
                  onRecordAudioStart(!!messageInputRef.current?.value)
                }
                onPressOut={onRecordAudioStop}
              >
                <Feather name="mic" size={26} color={colors.secondary} />
              </AudioButton>
            </AudioContainer>
          )}
        </OptionsContainer>
      </InputContainer>
    </FormContainer>
  );
};
