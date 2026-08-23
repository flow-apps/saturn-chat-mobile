import { useState, useCallback } from "react";
import _ from "lodash";
import api from "@services/api";
import crashlytics from "@react-native-firebase/crashlytics";
import { MessageData } from "@type/interfaces";

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
