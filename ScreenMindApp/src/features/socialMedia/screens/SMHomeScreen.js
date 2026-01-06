import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardBackground from "../../../components/DashboardBackground";

import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

import SMActionCard from "../components/SMActionCard";
import SMRiskBadge from "../components/SMRiskBadge";
import SMSectionTitle from "../components/SMSectionTitle";
import SMMetricsGrid from "../components/SMMetricsGrid";

import { SM_ROUTES, RISK_LEVELS } from "../utils/sm.constants";
import { formatMinutes, toFixedMaybe } from "../utils/sm.formatters";

export default function SMHomeScreen({ navigation }) {
  const riskLevel = RISK_LEVELS.MODERATE;

  const metrics = [
    {
      label: "Sentiment",
      value: `${toFixedMaybe(-0.62)}`,
      sub: "Today (avg score)",
      tint: "rgba(124,58,237,0.25)",
    },
    {
      label: "Absolutist",
      value: "2",
      sub: "Words detected",
      tint: "rgba(239,68,68,0.18)",
    },
    {
      label: "Emoji masking",
      value: "No",
      sub: "Contradictions",
      tint: "rgba(14,165,233,0.22)",
    },
    {
      label: "Latency",
      value: formatMinutes(95),
      sub: "Avg response time",
      tint: "rgba(34,197,94,0.18)",
    },
  ];

  return (
    <DashboardBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.brand}>SOCIAL MEDIA</Text>
        <Text style={styles.title}>Mental State Analyzer</Text>
        <Text style={styles.sub}>
          This module summarizes emotional exposure, social withdrawal, and interaction signals.
        </Text>

        <SMRiskBadge
          level={riskLevel}
          hint="Mood signal and response patterns show moderate risk today."
        />

        <SMSectionTitle
          title="Quick Metrics"
          subtitle="A compact snapshot of today’s signals."
        />
        <SMMetricsGrid metrics={metrics} />

        <SMSectionTitle title="Actions" subtitle="Explore each analysis pillar." />

        <View style={{ gap: spacing.md }}>
          <SMActionCard
            title="Daily Journal"
            emoji="📝"
            glow="rgba(124,58,237,0.75)"
            onPress={() => navigation.navigate(SM_ROUTES.Journal)}
          />

          <SMActionCard
            title="Notification Analysis"
            emoji="🔔"
            glow="rgba(14,165,233,0.75)"
            onPress={() => navigation.navigate(SM_ROUTES.Notification)}
          />

          <SMActionCard
            title="Ghosting Detector"
            emoji="⏱️"
            glow="rgba(34,197,94,0.75)"
            onPress={() => navigation.navigate(SM_ROUTES.Ghosting)}
          />

          <SMActionCard
            title="Insights"
            emoji="🧠"
            glow="rgba(124,58,237,0.65)"
            onPress={() => navigation.navigate(SM_ROUTES.Insights)}
          />

          <SMActionCard
            title="History"
            emoji="📊"
            glow="rgba(34,197,94,0.65)"
            onPress={() => navigation.navigate(SM_ROUTES.History)}
          />

          <SMActionCard
            title="Privacy & Ethics"
            emoji="🔒"
            glow="rgba(255,255,255,0.35)"
            onPress={() => navigation.navigate(SM_ROUTES.Privacy)}
          />
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </DashboardBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },
  brand: { color: colors.muted, fontWeight: "900", letterSpacing: 2.5 },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    marginTop: spacing.sm,
  },
  sub: {
    color: colors.muted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
});
