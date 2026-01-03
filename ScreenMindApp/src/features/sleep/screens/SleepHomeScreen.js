import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenBackground from "../../../components/ScreenBackground";
import PrimaryButton from "../../../components/PrimaryButton";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import StatPill from "../components/StatPill";

export default function SleepHomeScreen({ navigation }) {
  // Dummy UI values (replace later with real data / model output)
  const sleepScore = 72;
  const sleepStatus = "Good";
  const nightUse = "High";
  const unlocksAfter9 = 11;

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>SLEEPMIND</Text>
        <Text style={styles.title}>Sleep</Text>
        <Text style={styles.sub}>Sleep quality & disruption insights.</Text>

        <View style={styles.scoreCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardLabel}>Sleep Quality Score</Text>
            <Text style={styles.score}>{sleepScore} / 100</Text>
            <Text style={styles.status}>{sleepStatus}</Text>
            <Text style={styles.hint} numberOfLines={2}>
              Based on late-night usage, unlocks, and notifications.
            </Text>
          </View>

          <View style={styles.pillTag}>
            <Text style={styles.pillText}>Today</Text>
          </View>
        </View>

        <View style={styles.row}>
          <StatPill label="Night Phone Use" value={nightUse} tint="rgba(124,58,237,0.22)" />
          <StatPill label="Unlocks After 9PM" value={String(unlocksAfter9)} tint="rgba(34,197,94,0.18)" />
        </View>

        <View style={{ height: spacing.md }} />

        <PrimaryButton title="Morning Check-In" onPress={() => navigation.navigate("SleepCheckIn")} />
        <View style={{ height: spacing.sm }} />

        <PrimaryButton
          title="View Details"
          onPress={() => navigation.navigate("SleepDetails")}
          style={{ backgroundColor: colors.primary2 }}
        />
        <View style={{ height: spacing.sm }} />

        <PrimaryButton
          title="Data & Permissions"
          onPress={() => navigation.navigate("SleepPermissions")}
          style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
        />
        <View style={{ height: spacing.sm }} />

        <PrimaryButton
          title="Snoring (Optional)"
          onPress={() => navigation.navigate("SleepSnoring")}
          style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
        />

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },

  brand: { color: colors.muted, fontWeight: "900", letterSpacing: 2.0, marginBottom: spacing.sm },
  title: { color: colors.text, fontSize: 28, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.lg, lineHeight: 18 },

  scoreCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.lg,
    flexDirection: "row",
    gap: 12,
    marginBottom: spacing.lg,
  },
  cardLabel: { color: colors.muted, fontSize: 13, fontWeight: "800" },
  score: { color: colors.text, fontSize: 26, fontWeight: "900", marginTop: 6 },
  status: { color: colors.primary2, fontSize: 14, fontWeight: "900", marginTop: 4 },
  hint: { color: colors.faint, fontSize: 12, marginTop: 8, lineHeight: 16 },

  pillTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(124,58,237,0.22)",
    borderWidth: 1,
    borderColor: colors.border,
    height: 34,
  },
  pillText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  row: { flexDirection: "row", gap: spacing.md },
});
