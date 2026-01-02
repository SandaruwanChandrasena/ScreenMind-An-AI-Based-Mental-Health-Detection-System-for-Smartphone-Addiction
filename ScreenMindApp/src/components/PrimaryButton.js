import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && !disabled && { opacity: 0.9 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
