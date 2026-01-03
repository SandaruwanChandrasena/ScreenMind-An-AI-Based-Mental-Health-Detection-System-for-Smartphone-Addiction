import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ScreenBackground from "../../../components/ScreenBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function IsolationWhyScreen() {
  // ✅ DUMMY EXPLANATIONS (EDIT LATER: connect to feature importance / SHAP)
  const reasons = useMemo(
    () => [
      { title: "Low mobility", detail: "Daily distance decreased compared to your weekly average." },
      { title: "High time at home", detail: "Most days were spent at a single location." },
      { title: "Reduced social diversity", detail: "Unique contacts count is lower this week." },
      { title: "Low proximity exposure", detail: "Fewer nearby Bluetooth devices detected." },
      { title: "Night phone usage", detail: "Late-night sessions increased, affecting routine." },
      { title: "Low Wi-Fi diversity", detail: "Few unique networks indicates low environment variety." },
    ],
    []
  );

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Why this risk?</Text>
        <Text style={styles.sub}>
          This is an explainable view of the factors that contributed to your isolation risk score.
        </Text>

        <View style={styles.card}>
          {reasons.map((r, idx) => (
            <View key={r.title} style={[styles.item, idx !== 0 && styles.itemBorder]}>
              <Text style={styles.itemTitle}>• {r.title}</Text>
              <Text style={styles.itemDetail}>{r.detail}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          Privacy note: We analyze only aggregated behavioral signals. No message or call content is used.
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
  itemBorder: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 10 },
  itemTitle: { color: colors.text, fontWeight: "900", fontSize: 14 },
  itemDetail: { color: colors.faint, marginTop: 6, lineHeight: 18 },

  note: { color: colors.faint, marginTop: spacing.lg, fontSize: 12, lineHeight: 16 },
});
