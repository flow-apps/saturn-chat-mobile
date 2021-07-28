import React, { createContext, useContext, useEffect, useState } from "react";
import Constants, { ExecutionEnvironment } from "expo-constants";
import uuid from "react-native-uuid";

import * as Analytics from "expo-firebase-analytics";
import { useAuth } from "./auth";

type FirebaseContextProps = {
  analytics: typeof Analytics;
};

const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps
);

const FirebaseProvider: React.FC = ({ children }) => {
  const [analytics, setAnalytics] = useState<typeof Analytics>(Analytics);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        await Analytics.setUserId(user.id);
      }

      Analytics.setClientId(uuid.v4().toString());
      await Analytics.setDebugModeEnabled(__DEV__);

      setAnalytics(analytics);
    })();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        analytics,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => {
  const context = useContext(FirebaseContext);

  return context;
};

export { FirebaseProvider, useFirebase };
