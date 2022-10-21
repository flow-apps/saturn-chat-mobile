import React, { createContext, useContext } from "react";

interface IChatContext {}

const ChatContext = createContext({} as IChatContext);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};

const useChat = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChat };
