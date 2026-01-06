import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function SMActionCard({
  title,
  emoji = "➡️",
  onPress,
  glow = "rgba(124,58,237,0.65)",
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderColor: glow, shadowColor: glow },
        pressed && styles.pressed,
      ]}
    >
      {/* Left accent line */}
      <View style={[styles.accent, { backgroundColor: glow }]} />

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Text style={styles.emoji}>{emoji}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 52,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderRadius: 16,

    /**
     * ✅ IMPORTANT FIX:
     * Use a more OPAQUE background so the DashboardBackground
     * shapes cannot show through (removes that black band).
     */
    backgroundColor: "rgba(18,26,51,0.92)", // solid premium dark

    borderWidth: 1.6,
    overflow: "hidden",

    // Glow
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,

    flexDirection: "row",
    alignItems: "center",
  },

  pressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.95,
  },

  accent: {
    width: 3,
    height: 22,
    borderRadius: 999,
    marginRight: spacing.sm,
    opacity: 0.95,
  },

  title: {
    flex: 1,
    color: colors.text,
    fontWeight: "800",
    fontSize: 15,
  },

  emoji: {
    fontSize: 18,
    marginLeft: spacing.sm,
  },
});
