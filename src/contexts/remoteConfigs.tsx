import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface RemoteConfigContextProps {
  getRemoteConfigs: (type?: "premium" | "default" | "all") => Promise<Configs>,
  allConfigs: Configs;
  userConfigs: UserConfigs;
}

export interface Configs {
  default_file_upload: string;
  premium_file_upload: string;
  default_max_participants: string;
  premium_max_participants: string;
  default_max_groups: string;
  premium_max_groups: string;
}

interface UserConfigs {
  fileUpload: number;
  amountGroups: number;
  amountParticipants: number;
}

const RemoteConfigsContext = createContext({} as RemoteConfigContextProps)

const RemoteConfigsProvider: React.FC = ({ children }) => {

  const [allConfigs, setAllConfigs] = useState<Configs>({} as Configs)
  const [userConfigs, setUserConfigs] = useState<UserConfigs>({} as UserConfigs)


  useEffect(() => {
    (async () => {
      const configs = await getRemoteConfigs("all")      
      setAllConfigs(configs)
      
      setInterval(async () => {
        const configs = await getRemoteConfigs("all")      
        setAllConfigs(configs)
      }, 10000)
    })()
  }, [])

  useEffect(() => {
    updateUserConfigs()
  }, [allConfigs])

  const getRemoteConfigs = async (type?: string) => {
    const res = await api.get(`/app/configs?type=${type || "all"}`)
    return res.data as Configs
  }

  const updateUserConfigs = async () => {
    if (false) {
      return setUserConfigs({
        fileUpload: parseFloat(allConfigs.premium_file_upload),
        amountGroups: parseInt(allConfigs.premium_max_groups),
        amountParticipants: parseInt(allConfigs.premium_max_participants)
      })
    }

    return setUserConfigs({
      fileUpload: parseFloat(allConfigs.default_file_upload),
      amountGroups: parseInt(allConfigs.default_max_groups),
      amountParticipants: parseInt(allConfigs.default_max_participants)
    })
  }

  return (
    <RemoteConfigsContext.Provider
      value={{
        getRemoteConfigs,
        allConfigs,
        userConfigs
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