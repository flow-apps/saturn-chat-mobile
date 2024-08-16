import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MessageData, UserData } from "@type/interfaces";
import { useAuth } from "./auth";
import { useWebsocket } from "./websocket";
import { getRoutes, navigate } from "../routes/rootNavigation";

type onSendedUserMessageCallbackType = {
  msg: MessageData;
  localReference: string;
};

interface IHandleSetTyping {
  action: "ADD" | "REMOVE";
}

interface IHandleSendMessage {
  localReference: string;
  withFiles: boolean;
  message?: string;
  message_id?: string;
  reply_to_id?: string;
}

interface IHandleSendVoiceMessage {
  audio: {
    [key: string]: any;
  };
  reply_to_id: string;
  message: string;
  localReference: string;
}

interface IHandleDeleteMessage {
  message_id: string;
}

interface DeleteMessageResult {
  id: string;
  type: "message" | "audio";
  voice_message?: {
    id: string;
    name: string;
  };
  files?: {
    id: string;
    name: string;
    type: string;
  }[];
}

interface IChatContext {
  currentGroupId: string;
  connected: boolean;
  handleJoinRoom: (groupId: string) => void;
  handleSetReadMessage: (messageId: string) => void;
  handleSetTyping: (data: IHandleSetTyping) => void;
  handleSendMessage: (data: IHandleSendMessage) => void;
  handleSendVoiceMessage: (data: IHandleSendVoiceMessage) => void;
  handleDeleteMessage: (data: IHandleDeleteMessage) => void;
  onSendedUserMessage: (
    callback: (data: onSendedUserMessageCallbackType) => void
  ) => void;
  onNewUserMessage: (callback: (data: MessageData) => void) => void;
  onNewUserTyping: (callback: (data: UserData) => void) => void;
  onDeletedUserTyping: (callback: (userId: string) => void) => void;
  onDeleteUserMessage: (
    callback: (result: DeleteMessageResult) => void
  ) => void;
}

const ChatContext = createContext({} as IChatContext);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentGroupId, setCurrentGroupId] = useState("");
  const [connected, setConnected] = useState(false);

  const { socket } = useWebsocket();
  const { user } = useAuth();

  const handleJoinRoom = useCallback(
    (groupId: string) => {
      if (!connected) {
        console.log(`Conectando o usuário ao grupo ${groupId}`);

        setCurrentGroupId(groupId);

        socket.emit("connect_in_chat", groupId);
      }
    },
    [socket, connected, currentGroupId]
  );

  const handleSetReadMessage = useCallback(
    (messageId: string) => {
      socket.emit("set_read_message", {
        message_id: messageId,
        group_id: currentGroupId,
      });
    },
    [socket, currentGroupId]
  );

  const handleSetTyping = useCallback(
    (data: IHandleSetTyping) => {
      if (data.action === "ADD") {
        socket?.emit("add_user_typing", {
          typing: true,
          group_id: currentGroupId,
        });
      } else {
        socket?.emit("remove_user_typing", {
          typing: false,
          group_id: currentGroupId,
          userID: user?.id,
        });
      }
    },
    [socket, user, currentGroupId]
  );

  const handleSendMessage = useCallback(
    (data: IHandleSendMessage) => {
      if (!data.withFiles) {
        socket.emit("new_user_message", {
          localReference: data.localReference,
          reply_to_id: data.reply_to_id,
          group_id: currentGroupId,
          message: data.message,
        });
      } else {
        socket?.emit("new_message_with_files", {
          message_id: data.message_id,
          group_id: currentGroupId,
          localReference: data.localReference,
        });
      }
    },
    [socket, currentGroupId]
  );

  const handleSendVoiceMessage = useCallback(
    (data: IHandleSendVoiceMessage) => {
      socket.emit("new_voice_message", {
        audio: data.audio,
        reply_to_id: data.reply_to_id,
        message: data.message,
        localReference: data.localReference,
        group_id: currentGroupId,
      });
    },
    [socket, currentGroupId]
  );

  const handleDeleteMessage = useCallback(
    (data: IHandleDeleteMessage) => {
      socket.emit("delete_user_message", {
        message_id: data.message_id,
        group_id: currentGroupId,
      });
    },
    [socket, currentGroupId]
  );

  const onSendedUserMessage = useCallback(
    (callback: (data: onSendedUserMessageCallbackType) => void) => {
      socket.on("sended_user_message", callback);
    },
    [socket]
  );

  const onNewUserMessage = useCallback(
    (callback: (data: MessageData) => void) => {
      socket.on("new_user_message", callback);
    },
    [socket]
  );

  const onNewUserTyping = useCallback(
    (callback: (data: UserData) => void) => {
      socket.on("new_user_typing", callback);
    },
    [socket]
  );

  const onDeletedUserTyping = useCallback(
    (callback: (userId: string) => void) => {
      socket.on("deleted_user_typing", callback);
    },
    [socket]
  );

  const onDeleteUserMessage = useCallback(
    (callback: (result: DeleteMessageResult) => void) => {
      socket.on("delete_user_message", callback);
    },
    [socket]
  );

  useEffect(() => {
    if (socket) {
      socket.on("deleted_group", () => {
        navigate("Groups");
      });
      socket.on("kicked_user", ({ group_id, user_id }) => {        
        if (group_id === currentGroupId) {
          if (user_id === user.id) {
            navigate("Groups");
          }
        }
      });
      socket.on("banned_user", ({ group_id, user_id }) => {
        if (group_id === currentGroupId) {
          if (user_id === user.id) {
            navigate("Groups");
          }
        }
      });

      socket.on("success_join", (groupID) => {
        console.log("Usuário conectado com sucesso ao grupo", groupID);

        // setCurrentGroupId(groupID);
        setConnected(true);
      });

      socket.on("success_leave", (groupID) => {
        console.log("Usuário desconectado com sucesso do grupo", groupID);

        setCurrentGroupId("");
        setConnected(false);
      });
    }

    return () => {
      socket?.off("kicked_user");
      socket?.off("banned_user");
      socket?.off("deleted_group");
      socket?.off("success_join");
      socket?.off("success_leave");
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        currentGroupId,
        handleJoinRoom,
        handleSetReadMessage,
        handleSetTyping,
        handleSendMessage,
        handleSendVoiceMessage,
        handleDeleteMessage,
        onSendedUserMessage,
        onNewUserMessage,
        onNewUserTyping,
        onDeletedUserTyping,
        onDeleteUserMessage,
        connected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChat };
