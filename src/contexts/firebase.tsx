import React, { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import * as Analytics from "expo-firebase-analytics";
import Crashlytics from "@react-native-firebase/crashlytics";
import Performance from "@react-native-firebase/perf";

import { useAuth } from "./auth";

type FirebaseContextProps = {
  analytics: typeof Analytics;
};

const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps
);

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [analytics, setAnalytics] = useState<typeof Analytics>(Analytics);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        await Analytics.setUserId(user.id);
      }

      Analytics.setClientId(uuid.v4().toString());
      setAnalytics(Analytics);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        await Crashlytics().setUserId(String(user?.id));
        await Crashlytics().setAttributes(user as {});
      }

      await Crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
      await Performance().setPerformanceCollectionEnabled(!__DEV__);
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
