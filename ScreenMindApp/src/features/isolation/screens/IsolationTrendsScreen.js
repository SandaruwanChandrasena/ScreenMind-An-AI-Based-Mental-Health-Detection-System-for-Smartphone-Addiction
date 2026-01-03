import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ScreenBackground from "../../../components/ScreenBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function IsolationTrendsScreen() {
  // ✅ DUMMY TREND (EDIT LATER)
  const trend = useMemo(
    () => [
      { day: "Mon", risk: "Low", mobility: "2.8 km", contacts: "5" },
      { day: "Tue", risk: "Low", mobility: "2.2 km", contacts: "4" },
      { day: "Wed", risk: "Moderate", mobility: "1.4 km", contacts: "3" },
      { day: "Thu", risk: "Moderate", mobility: "1.2 km", contacts: "2" },
      { day: "Fri", risk: "Moderate", mobility: "1.1 km", contacts: "2" },
      { day: "Sat", risk: "Moderate", mobility: "0.9 km", contacts: "2" },
      { day: "Sun", risk: "Moderate", mobility: "1.0 km", contacts: "2" },
    ],
    []
  );

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Trends</Text>
        <Text style={styles.sub}>7-day behavioral trend snapshot for your progress review.</Text>

        <View style={styles.card}>
          <View style={styles.headRow}>
            <Text style={[styles.h, { flex: 1 }]}>Day</Text>
            <Text style={[styles.h, { width: 90, textAlign: "right" }]}>Risk</Text>
            <Text style={[styles.h, { width: 90, textAlign: "right" }]}>Mobility</Text>
            <Text style={[styles.h, { width: 90, textAlign: "right" }]}>Contacts</Text>
          </View>

          {trend.map((t, idx) => (
            <View key={t.day} style={[styles.row, idx !== 0 && styles.borderTop]}>
              <Text style={[styles.cell, { flex: 1 }]}>{t.day}</Text>
              <Text style={[styles.cell, { width: 90, textAlign: "right" }]}>{t.risk}</Text>
              <Text style={[styles.cell, { width: 90, textAlign: "right" }]}>{t.mobility}</Text>
              <Text style={[styles.cell, { width: 90, textAlign: "right" }]}>{t.contacts}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          Next phase: Replace this table with real-time plots (risk score vs time) from backend.
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

  headRow: { flexDirection: "row", paddingBottom: 10 },
  h: { color: colors.muted, fontWeight: "900", fontSize: 12 },

  row: { flexDirection: "row", paddingVertical: 12 },
  borderTop: { borderTopWidth: 1, borderTopColor: colors.border },
  cell: { color: colors.text, fontWeight: "800", fontSize: 12 },

  note: { color: colors.faint, marginTop: spacing.lg, fontSize: 12, lineHeight: 16 },
});
