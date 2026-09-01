import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useCallStatus } from "@contexts/callStatus";
import {
  getCurrentRoute,
  navigate,
  navigationRef,
} from "@routes/rootNavigation";

const CallFloatingButton: React.FC = () => {
  const { activeCallRoomId } = useCallStatus();
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
    navigate("Call", { groupId: activeCallRoomId });
  };

  return currentRouteName === "Call" || !activeCallRoomId ? null : (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>Voltar para chamada</Text>
      </Pressable>
    </View>
  );
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
