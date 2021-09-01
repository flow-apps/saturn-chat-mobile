import React, { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import Crashlytics from "@react-native-firebase/crashlytics"

import * as Analytics from "expo-firebase-analytics";
import { useAuth } from "./auth";

type FirebaseContextProps = {
  analytics: typeof Analytics;
  crashlytics: typeof Crashlytics | null;
};

const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps
);

const FirebaseProvider: React.FC = ({ children }) => {
  const [analytics, setAnalytics] = useState<typeof Analytics>(Analytics);
  const [crashlytics, setCrashlytics] = useState<typeof Crashlytics | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        await Analytics.setUserId(user.id);
      }

      Analytics.setClientId(uuid.v4().toString());

      setAnalytics(analytics);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        await Crashlytics().setUserId(String(user?.id))
        await Crashlytics().setAttributes(user as {})
      }
  
      await Crashlytics().setCrashlyticsCollectionEnabled(!__DEV__)
      setCrashlytics(Crashlytics)
    })()
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        analytics,
        crashlytics
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
