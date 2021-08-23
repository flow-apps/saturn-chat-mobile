import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface RemoteConfigContextProps {
  getRemoteConfigs: (type?: "premium" | "default" | "all") => Promise<Configs>,
  allConfigs: Configs
}

interface Configs {
  default_file_upload: string;
  premium_file_upload: string;
  default_max_participants: string;
  premium_max_participants: string;
  default_max_groups: string;
  premium_max_groups: string;
}

const RemoteConfigsContext = createContext({} as RemoteConfigContextProps)

const RemoteConfigsProvider: React.FC = ({ children }) => {

  const [allConfigs, setAllConfigs] = useState<Configs>({} as Configs)

  useEffect(() => {
    (async () => {
      const configs = await getRemoteConfigs("all")      
      setAllConfigs(configs)
    })()
  }, [])

  const getRemoteConfigs = async (type?: string) => {
    const res = await api.get(`/app/configs?type=${type || "all"}`)
    return res.data as Configs
  }

  return (
    <RemoteConfigsContext.Provider
      value={{
        getRemoteConfigs,
        allConfigs
      }}
    >
      {children}
    </RemoteConfigsContext.Provider>
  );
}

const useRemoteConfigs = () => {
  const configsContext = useContext(RemoteConfigsContext)

  return configsContext
}

export { RemoteConfigsProvider, useRemoteConfigs };