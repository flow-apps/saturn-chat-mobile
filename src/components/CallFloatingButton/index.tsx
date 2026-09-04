import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useCallStatus } from "@contexts/callStatus";
import { useTranslate } from "@hooks/useTranslate";
import {
  getCurrentRoute,
  navigate,
  navigationRef,
} from "@routes/rootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

const CallFloatingButton: React.FC = () => {
  const { activeCallRoomId } = useCallStatus();
  const { t } = useTranslate("Call");
  const [currentRouteName, setCurrentRouteName] = useState<
    string | undefined
  >();

  useEffect(() => {
    const refreshRoute = () => {
      const route = getCurrentRoute();
      setCurrentRouteName(route?.name);
    };

    refreshRoute();

    const unsubscribe = navigationRef.current?.addListener(
      "state",
      refreshRoute,
    );

    return () => {
      unsubscribe?.();
    };
  }, []);

  const handlePress = () => {
    if (!activeCallRoomId) return;
    navigate("Call", { groupId: activeCallRoomId });
  };

  const isOnCallScreen = currentRouteName === "Call";

  return !isOnCallScreen && activeCallRoomId ? (
    <Pressable onPress={handlePress} style={styles.button}>
      <SafeAreaView pointerEvents="box-none" style={styles.wrapper}>
        <Text style={styles.text}>{t("floating_button")}</Text>
      </SafeAreaView>
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  button: {
    backgroundColor: "#FF9D00",
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    width: "100%",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
});

export default CallFloatingButton;
