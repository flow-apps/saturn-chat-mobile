import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StorageService } from "../services/storage";

type Response<T> = [T, Dispatch<SetStateAction<T>>, boolean];

const storage = new StorageService();

function usePersistedState<T>(key: string, initialState: any): Response<T> {
  const [state, setState] = useState<T>(initialState);
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    (async () => {
      const storagedValue = await storage.getItem(key);

      if (storagedValue) {
        setState(JSON.parse(storagedValue));
        setFetched(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await storage.saveItem(key, JSON.stringify(state));
    })();
  }, [key, state]);

  return [state, setState, fetched];
}

export { usePersistedState };
