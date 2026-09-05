import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { StorageService } from "@services/storage";

type Response<T> = [T, Dispatch<SetStateAction<T>>, boolean];

const storage = new StorageService();

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);
  const [fetched, setFetched] = useState(false);

  const isLoadedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPersistedData() {
      try {
        const storagedValue = await storage.getItem(key);

        if (storagedValue && isMounted) {
          setState(JSON.parse(storagedValue));
        }
      } catch (error) {
        console.warn(
          `[usePersistedState] Erro ao carregar chave "${key}":`,
          error,
        );
      } finally {
        if (isMounted) {
          isLoadedRef.current = true;
          setFetched(true);
        }
      }
    }

    loadPersistedData();

    return () => {
      isMounted = false;
    };
  }, [key]);

  useEffect(() => {
    if (!isLoadedRef.current) return;

    async function persistData() {
      try {
        await storage.saveItem(key, JSON.stringify(state));
      } catch (error) {
        console.warn(
          `[usePersistedState] Erro ao salvar chave "${key}":`,
          error,
        );
      }
    }

    persistData();
  }, [key, state]);

  return [state, setState, fetched];
}

export { usePersistedState };
