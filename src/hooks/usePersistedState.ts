import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StorageService } from "../services/Storage";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

const storage = new StorageService();

function usePersistedState<T>(key: string, initialState: any): Response<T> {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    async function getItem() {
      const storagedValue = await storage.getItem(key);

      if (storagedValue) {
        setState(JSON.parse(storagedValue) as T);
      }
    }

    getItem();
  }, []);

  useEffect(() => {
    async function changeState() {
      await storage.saveItem(key, JSON.stringify(state));
    }
    changeState();
  }, [key, state]);

  return [state, setState];
}

export { usePersistedState };
