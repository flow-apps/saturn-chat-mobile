import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import api from "@services/api";
import crashlytics from "@react-native-firebase/crashlytics";
import { MessageData } from "@type/interfaces";
import { useWebsocket } from "@contexts/websocket";

const MESSAGES_LIMIT_REQUEST = 30;

export const useChatMessages = (groupId: string) => {
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [fetchedAll, setFetchedAll] = useState(false);

  const sortMessages = useCallback((messages: MessageData[]): MessageData[] => {
    return [...messages].sort((a, b) => {
      const dateA = a.created_at
        ? new Date(a.created_at).getTime()
        : Date.now();
      const dateB = b.created_at
        ? new Date(b.created_at).getTime()
        : Date.now();

      if (isNaN(dateA)) return -1;
      if (isNaN(dateB)) return 1;

      return dateB - dateA;
    });
  }, []);

  const fetchOldMessages = useCallback(async () => {
    if (fetching || fetchedAll) return;
    setFetching(true);
    try {
      const { data } = await api.get(
        `/messages/${groupId}?_page=${page}&_limit=${MESSAGES_LIMIT_REQUEST}`,
      );

      if (data.messages.length < MESSAGES_LIMIT_REQUEST) {
        setFetchedAll(true);
      }

      setOldMessages((old) =>
        sortMessages(_.uniqBy([...old, ...data.messages], "id")),
      );
      setPage((prev) => prev + 1);
    } catch (error) {
      crashlytics().recordError(error as Error, "Fetch Old Messages Error");
    } finally {
      setFetching(false);
    }
  }, [fetching, fetchedAll, groupId, page, sortMessages]);

  const { socket } = useWebsocket();

  useEffect(() => {
    function handlePollVotesUpdated(data: {
      poll_id: string;
      message_id: string;
      options: Array<{ id: string; option_text: string; votes_count: number }>;
      voted_by: { user_id: string; option_id: string };
    }) {
      setOldMessages((prevMessages) => {
        const messageIndex = prevMessages.findIndex(
          (msg) => msg.id === data.message_id || msg.poll?.id === data.poll_id,
        );

        if (messageIndex === -1) return prevMessages;

        const updatedMessages = [...prevMessages];
        const targetMessage = { ...updatedMessages[messageIndex] };

        if (targetMessage.poll) {
          const updatedOptions = targetMessage.poll.options.map((option) => {
            const newOptionData = data.options.find(
              (opt) => opt.id === option.id,
            );

            let updatedVotes = option.votes || [];

            if (!targetMessage.poll?.allows_multiple) {
              updatedVotes = updatedVotes.filter(
                (v) => v.user_id !== data.voted_by.user_id,
              );
            }

            if (option.id === data.voted_by.option_id) {
              const alreadyVotedThisOption = updatedVotes.some(
                (v) => v.user_id === data.voted_by.user_id,
              );

              if (!alreadyVotedThisOption) {
                updatedVotes = [
                  ...updatedVotes,
                  {
                    id: `temp_${Date.now()}`,
                    poll_id: data.poll_id,
                    option_id: option.id,
                    user_id: data.voted_by.user_id,
                    created_at: new Date().toISOString(),
                  } as any,
                ];
              }
            }

            return {
              ...option,
              votes_count: newOptionData
                ? newOptionData.votes_count
                : option.votes_count,
              votes: updatedVotes,
            };
          });

          targetMessage.poll = {
            ...targetMessage.poll,
            options: updatedOptions,
          };
        }

        updatedMessages[messageIndex] = targetMessage;
        return updatedMessages;
      });
    }

    socket?.on("poll_votes_updated", handlePollVotesUpdated);

    return () => {
      socket?.off("poll_votes_updated", handlePollVotesUpdated);
    };
  }, [socket]);

  return {
    oldMessages,
    setOldMessages,
    fetching,
    fetchedAll,
    fetchOldMessages,
    sortMessages,
    setFetchedAll,
    setPage,
  };
};
