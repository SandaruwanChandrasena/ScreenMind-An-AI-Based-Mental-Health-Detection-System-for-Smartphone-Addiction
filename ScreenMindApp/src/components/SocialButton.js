import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function SocialButton({ title = "Continue with Google", onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.95 }]}>
      <View style={styles.row}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>G</Text>
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.google,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  logoText: { fontWeight: "900", color: "#DB4437" },
  text: { color: colors.googleText, fontSize: 15, fontWeight: "800" },
});
