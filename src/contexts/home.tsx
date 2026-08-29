import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useWebsocket } from "./websocket";
import { DateUtils } from "@utils/date";

interface HomeContext {
  hasInvites: boolean;
  handleCheckInvites: () => void;
  setHasInvites: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeContext = createContext<HomeContext>({} as HomeContext);
const { convertToMillis } = new DateUtils();

const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useWebsocket();
  const [hasInvites, setHasInvites] = useState(false);

  const handleCheckInvites = useCallback(() => {
    if (!socket) return;
    socket.emit("check_has_invites");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleNewInvite = ({ hasNewInvites }: { hasNewInvites: boolean }) => {
      setHasInvites(hasNewInvites);
    };

    socket.on("new_invite_received", handleNewInvite);

    handleCheckInvites();

    const interval = setInterval(
      () => {
        handleCheckInvites();
      },
      convertToMillis(10, "SECONDS"),
    );

    return () => {
      socket.off("new_invite_received", handleNewInvite);
      clearInterval(interval);
    };
  }, [socket, handleCheckInvites]);

  const contextValue = useMemo(
    () => ({
      hasInvites,
      setHasInvites,
      handleCheckInvites,
    }),
    [hasInvites, handleCheckInvites],
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

const useHome = () => useContext(HomeContext);

export { HomeProvider, useHome };
