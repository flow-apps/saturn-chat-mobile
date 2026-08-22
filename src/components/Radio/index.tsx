import fonts from "@styles/fonts";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { useTheme } from "styled-components";

interface RadioProps {
  label: string;
  value: string;
  selectedValue: string;
  color?: string;
  onValueChange: (value: string) => void;
}

const Radio = ({
  label,
  color,
  value,
  selectedValue,
  onValueChange,
}: RadioProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <RadioButton
        value={value}
        status={selectedValue === value ? "checked" : "unchecked"}
        uncheckedColor={color || colors.light_gray}
        color={color || colors.secondary}
        onPress={() => onValueChange(value)}
      />
      <Text
        style={{
          fontFamily: fonts["text"],
          color: color || colors.black,
          flex: 1,
          width: 100
        }}
        onPress={() => onValueChange(value)}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
});

export default Radio;
