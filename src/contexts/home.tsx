import React, { useContext, createContext, useEffect, useState } from "react";
import { useWebsocket } from "./websocket";
import { secondsToMilliseconds } from "date-fns";

interface HomeContext {
  hasInvites: boolean;
  handleCheckInvites: () => void;
}

const HomeContext = createContext<HomeContext>({} as HomeContext);

const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useWebsocket();

  const [hasInvites, setHasInvites] = useState(false);

  const handleCheckInvites = () => {
    if (!socket) return;

    socket.emit("check_has_invites");
  };

  useEffect(() => {
    if (socket) {
      socket.on("new_invite_received", ({ hasNewInvites }) => {
        if (hasInvites !== hasNewInvites) setHasInvites(hasNewInvites);
      });

      handleCheckInvites();
    }

    return () => {
      socket?.off("new_invite_received");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      handleCheckInvites();
    }, secondsToMilliseconds(30));

    return () => {
      clearInterval(interval);
    };
  }, [socket]);

  return (
    <HomeContext.Provider value={{ hasInvites, handleCheckInvites }}>
      {children}
    </HomeContext.Provider>
  );
};

const useHome = () => {
  const homeContext = useContext(HomeContext);

  return homeContext;
};

export { HomeProvider, useHome };
