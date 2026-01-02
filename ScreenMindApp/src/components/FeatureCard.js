import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function FeatureCard({ title, subtitle, emoji, onPress, tint }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}
    >
      <View style={[styles.badge, { backgroundColor: tint || "rgba(124,58,237,0.25)" }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 150,
    borderRadius: 20,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  emoji: { fontSize: 20 },
  title: { color: colors.text, fontSize: 16, fontWeight: "900" },
  subtitle: { color: colors.muted, marginTop: 6, fontSize: 12, lineHeight: 16 },
});
