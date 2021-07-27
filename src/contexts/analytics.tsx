import React, { createContext, useContext, useEffect, useState } from "react";
import * as Analytics from "expo-firebase-analytics"
import Constants, { ExecutionEnvironment } from "expo-constants"
import uuid from "react-native-uuid"
import { useAuth } from "./auth";

type AnalyticsContextProps = {
  analytics: typeof Analytics
}

const AnalyticsContext = createContext<AnalyticsContextProps>({} as AnalyticsContextProps)

const AnalyticsProvider: React.FC = ({ children }) => {

  const [analytics, setAnalytics] = useState<typeof Analytics>(Analytics)
  const { user } = useAuth()

  useEffect(() => {
    (async () => {
      if (user) {
        await Analytics.setUserId(user.id)
      }

      if (Constants.executionEnvironment !== ExecutionEnvironment.Standalone) {
        Analytics.setClientId(uuid.v4().toString())
      }

      setAnalytics(analytics)
    })()
  }, [])

  return (
    <AnalyticsContext.Provider
      value={{
        analytics
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

const useAnalytics = () => {
  const context = useContext(AnalyticsContext)

  return context
}

export { AnalyticsProvider, useAnalytics }
