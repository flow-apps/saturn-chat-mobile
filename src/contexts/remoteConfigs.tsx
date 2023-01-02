import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import remoteConfig from "@react-native-firebase/remote-config";
import { hoursToMilliseconds, minutesToMilliseconds } from "date-fns";

interface RemoteConfigContextProps {
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
  default_max_message_length: string;
  premium_max_message_length: string;
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
    remoteConfig()
      .setConfigSettings({
        minimumFetchIntervalMillis: hoursToMilliseconds(1),
        fetchTimeMillis: minutesToMilliseconds(1),
      })
      .then(() =>
        remoteConfig().setDefaults({
          default_max_groups: 2,
          premium_max_groups: 10,
          default_file_upload: 12,
          premium_file_upload: 120,
          default_max_participants: 200,
          premium_max_participants: 1000,
          default_max_message_length: 500,
          premium_max_message_length: 5000,
        })
      )
      .then(() => remoteConfig().fetchAndActivate())
      .then(() => updateUserConfigs());
  }, []);

  const updateUserConfigs = useCallback(async () => {
    const values = remoteConfig().getAll();
    const configs = {} as Configs;

    Object.entries(values).forEach(($) => {
      const [key, entry] = $;
      configs[key] = entry.asString();
    });

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
