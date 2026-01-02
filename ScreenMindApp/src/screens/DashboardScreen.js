import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import ScreenBackground from "../components/ScreenBackground";
import FeatureCard from "../components/FeatureCard";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AuthContext } from "../context/AuthContext";

export default function DashboardScreen() {
  const { user, signOut } = useContext(AuthContext);

  const onLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  // Dummy scores for now (later we’ll replace with real ML outputs)
  const overallRisk = "Moderate";
  const overallHint = "Late-night usage increased this week.";

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>SCREENMIND</Text>

        <Text style={styles.title}>Welcome, {user?.displayName || "User"} 👋</Text>
        <Text style={styles.sub}>Your calm dashboard for healthier screen habits.</Text>

        {/* Top Summary Card */}
        <View style={styles.summaryCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>Overall Risk</Text>
            <Text style={styles.summaryValue}>{overallRisk}</Text>
            <Text style={styles.summaryHint} numberOfLines={2}>
              {overallHint}
            </Text>
          </View>

          <View style={styles.pill}>
            <Text style={styles.pillText}>Today</Text>
          </View>
        </View>

        {/* Feature Grid */}
        <View style={styles.grid}>
          <FeatureCard
            emoji="📱"
            title="Screen Usage"
            subtitle="Analyze screen time & addiction risk patterns"
            tint="rgba(124,58,237,0.25)"
            onPress={() => {}}
          />
          <FeatureCard
            emoji="😴"
            title="Sleep"
            subtitle="Estimate sleep disruption risk using phone activity"
            tint="rgba(34,197,94,0.22)"
            onPress={() => {}}
          />
        </View>

        <View style={styles.grid}>
          <FeatureCard
            emoji="💬"
            title="Social Media"
            subtitle="Detect risky interaction and engagement patterns"
            tint="rgba(59,130,246,0.22)"
            onPress={() => {}}
          />
          <FeatureCard
            emoji="📍"
            title="Isolation"
            subtitle="Mobility & communication-based loneliness risk"
            tint="rgba(239,68,68,0.18)"
            onPress={() => {}}
          />
        </View>

        {/* Actions */}
        <View style={{ height: spacing.lg }} />

        <PrimaryButton title="Log Out" onPress={onLogout} style={styles.logoutBtn} />

        <Pressable onPress={() => {}} style={({ pressed }) => [styles.footerLink, pressed && { opacity: 0.85 }]}>
          <Text style={styles.footerText}>Privacy & Data Settings</Text>
        </Pressable>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },

  brand: {
    color: colors.muted,
    fontWeight: "900",
    letterSpacing: 2.5,
    marginBottom: spacing.sm,
  },

  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.lg, lineHeight: 18 },

  summaryCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: spacing.lg,
  },

  summaryTitle: { color: colors.muted, fontSize: 13, fontWeight: "800" },
  summaryValue: { color: colors.text, fontSize: 24, fontWeight: "900", marginTop: 6 },
  summaryHint: { color: colors.faint, fontSize: 12, marginTop: 6, lineHeight: 16 },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(124,58,237,0.22)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  grid: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md },

  logoutBtn: {
    backgroundColor: colors.primary,
  },

  footerLink: { marginTop: spacing.md, alignItems: "center" },
  footerText: { color: colors.faint, fontWeight: "700" },
});
