import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import remoteConfig from "@react-native-firebase/remote-config";
import { minutesToMilliseconds } from "date-fns";

import appConfigs from "../config"

interface RemoteConfigContextProps {
  allConfigs: Configs;
  userConfigs: UserConfigs;
}

export interface Configs {
  api_url: string;
  default_file_upload: string;
  premium_file_upload: string;
  default_max_participants: string;
  premium_max_participants: string;
  default_max_groups: string;
  premium_max_groups: string;
  default_max_message_length: string;
  premium_max_message_length: string;
  ad_multiple_in_chat: string;
  ad_multiple_in_home: string;
}

interface UserConfigs {
  fileUpload: number;
  amountGroups: number;
  amountParticipants: number;
  messageLength: number;
}

const RemoteConfigsContext = createContext({} as RemoteConfigContextProps);

const RemoteConfigsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allConfigs, setAllConfigs] = useState<Configs>({} as Configs);
  const [userConfigs, setUserConfigs] = useState<UserConfigs>(
    {} as UserConfigs
  );

  useEffect(() => {
    (async () => {
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: minutesToMilliseconds(5),
        fetchTimeMillis: minutesToMilliseconds(1),
      })

      await remoteConfig().setDefaults({
        api_url: appConfigs.API_URL,
        default_max_groups: 2,
        premium_max_groups: 10,
        default_file_upload: 12,
        premium_file_upload: 120,
        default_max_participants: 200,
        premium_max_participants: 1000,
        default_max_message_length: 500,
        premium_max_message_length: 5000,
        ad_multiple_in_chat: 7,
        ad_multiple_in_home: 5
      })

      await remoteConfig().fetchAndActivate()
      await updateUserConfigs()
    })()
  }, []);

  const updateUserConfigs = useCallback(async () => {
    const values = remoteConfig().getAll();
    const configs = {} as Configs;

    Object.entries(values).forEach(($) => {
      const [key, entry] = $;
      configs[key] = entry.asString();
    });

    setAllConfigs(configs)

    // For premium users
    if (false) {
      return setUserConfigs({
        fileUpload: parseFloat(configs.premium_file_upload),
        amountGroups: parseInt(configs.premium_max_groups),
        amountParticipants: parseInt(configs.premium_max_participants),
        messageLength: parseInt(configs.premium_max_message_length),
      });
    }

    return setUserConfigs({
      fileUpload: Number(configs.default_file_upload),
      amountGroups: Number(configs.default_max_groups),
      amountParticipants: Number(configs.default_max_participants),
      messageLength: Number(configs.default_max_message_length),
    });
  }, []);

  return (
    <RemoteConfigsContext.Provider
      value={{
        allConfigs,
        userConfigs,
      }}
    >
      {children}
    </RemoteConfigsContext.Provider>
  );
};

const useRemoteConfigs = () => {
  return useContext(RemoteConfigsContext);
};

export { RemoteConfigsProvider, useRemoteConfigs };
