import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ScreenBackground from "../../../components/ScreenBackground";
import PrimaryButton from "../../../components/PrimaryButton";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function IsolationSuggestionsScreen() {
  // ✅ DUMMY SUGGESTIONS (EDIT LATER: personalize based on features)
  const suggestions = useMemo(
    () => [
      {
        title: "Take a short walk",
        detail: "Try a 10–15 minute walk today to increase mobility and routine variety.",
      },
      {
        title: "Connect with one friend",
        detail: "Send a message or call one person you trust. Small contact is enough.",
      },
      {
        title: "Reduce night phone use",
        detail: "Try phone-free time after 12 AM to improve daily rhythm and energy.",
      },
      {
        title: "Spend time in a new place",
        detail: "Even a campus area change increases environmental diversity (Wi-Fi variety).",
      },
    ],
    []
  );

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Suggestions</Text>
        <Text style={styles.sub}>Preventive nudges (not diagnosis). Small steps matter.</Text>

        <View style={styles.card}>
          {suggestions.map((s, idx) => (
            <View key={s.title} style={[styles.item, idx !== 0 && styles.borderTop]}>
              <Text style={styles.itemTitle}>✅ {s.title}</Text>
              <Text style={styles.itemDetail}>{s.detail}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.lg }} />

        <PrimaryButton title="Mark today as completed" onPress={() => {}} />

        <Text style={styles.note}>
          Next phase: suggestions will be generated based on the detected high-risk factors.
        </Text>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xl, flexGrow: 1 },
  title: { color: colors.text, fontSize: 24, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: 8, lineHeight: 18 },

  card: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.lg,
  },

  item: { paddingVertical: 10 },
  borderTop: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 10 },
  itemTitle: { color: colors.text, fontWeight: "900", fontSize: 14 },
  itemDetail: { color: colors.faint, marginTop: 6, lineHeight: 18 },

  note: { color: colors.faint, marginTop: spacing.lg, fontSize: 12, lineHeight: 16 },
});
