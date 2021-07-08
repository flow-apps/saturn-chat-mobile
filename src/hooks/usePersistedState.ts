import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StorageService } from "../services/Storage";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

const storage = new StorageService();

function usePersistedState<T>(key: string, initialState: any): Response<T> {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      const storagedValue = await storage.getItem(key);

      if (storagedValue) {
        setState(JSON.parse(storagedValue));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await storage.saveItem(key, JSON.stringify(state));
    })();
  }, [key, state]);

  return [state, setState];
}

export { usePersistedState };
