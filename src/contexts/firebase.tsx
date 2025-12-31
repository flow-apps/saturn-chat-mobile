import React, { createContext, useContext, useEffect, useState } from "react";

import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import performance from "@react-native-firebase/perf";

import { useAuth } from "./auth";

type FirebaseContextProps = {
};

const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps
);

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user && !__DEV__) {
        await analytics().setUserId(user.id)
        await crashlytics().setUserId(String(user?.id));
        await crashlytics().setAttributes(user as {});
      }

      await analytics().setAnalyticsCollectionEnabled(!__DEV__);
      await crashlytics().setCrashlyticsCollectionEnabled(!__DEV__);
      performance().dataCollectionEnabled = !__DEV__;
    })();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{}}
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
