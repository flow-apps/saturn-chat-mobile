import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useCallRoom } from "@hooks/useCallRoom";

interface ICallStatusContext {
  activeCallRoomId: string | null;
  setActiveCallRoom: (roomId: string | null) => void;
  clearActiveCallRoom: () => void;
  localStream: any;
  remoteStreams: { [socketId: string]: any };
  toggleAudio: (isMuted: boolean) => void;
  toggleVideo: (enableVideo: boolean) => Promise<void>;
  switchCamera: () => Promise<void>;
  endCall: () => void;
  isVideoEnabled: boolean;
  setVideoEnabled: (value: boolean) => void;
}

const CallStatusContext = createContext<ICallStatusContext>({
  activeCallRoomId: null,
  setActiveCallRoom: () => undefined,
  clearActiveCallRoom: () => undefined,
  localStream: null,
  remoteStreams: {},
  toggleAudio: () => undefined,
  toggleVideo: async () => undefined,
  switchCamera: async () => undefined,
  endCall: () => undefined,
  isVideoEnabled: false,
  setVideoEnabled: () => undefined,
});

export const CallStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCallRoomId, setActiveCallRoomId] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  const onEndCall = useCallback(() => {
    setActiveCallRoomId(null);
    setIsVideoEnabled(false);
  }, []);

  const session = useCallRoom(activeCallRoomId, onEndCall);

  const setActiveCallRoom = useCallback((roomId: string | null) => {
    setActiveCallRoomId(roomId);
  }, []);

  const clearActiveCallRoom = useCallback(() => {
    session.endCall();
    setActiveCallRoomId(null);
    setIsVideoEnabled(false);
  }, [session]);

  const setVideoEnabled = useCallback((value: boolean) => {
    setIsVideoEnabled(value);
    if (session.toggleVideo) {
      session.toggleVideo(value);
    }
  }, [session]);

  const value = useMemo(
    () => ({
      activeCallRoomId,
      setActiveCallRoom,
      clearActiveCallRoom,
      localStream: session.localStream,
      remoteStreams: session.remoteStreams,
      toggleAudio: session.toggleAudio,
      toggleVideo: session.toggleVideo,
      switchCamera: session.switchCamera,
      endCall: session.endCall,
      isVideoEnabled,
      setVideoEnabled,
    }),
    [activeCallRoomId, clearActiveCallRoom, isVideoEnabled, session, setActiveCallRoom, setVideoEnabled],
  );

  return (
    <CallStatusContext.Provider value={value}>
      {children}
    </CallStatusContext.Provider>
  );
};

export const useCallStatus = () => useContext(CallStatusContext);
