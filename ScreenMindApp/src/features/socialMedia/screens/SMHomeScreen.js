import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardBackground from "../../../components/DashboardBackground";
import PrimaryButton from "../../../components/PrimaryButton";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import SMRiskBadge from "../components/SMRiskBadge";
import SMSectionTitle from "../components/SMSectionTitle";
import SMMetricsGrid from "../components/SMMetricsGrid";
import { SM_ROUTES, RISK_LEVELS } from "../utils/sm.constants";
import { formatMinutes, toFixedMaybe } from "../utils/sm.formatters";

export default function SMHomeScreen({ navigation }) {
  // Dummy values for UI (replace with real backend data later)
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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>SOCIAL MEDIA</Text>
        <Text style={styles.title}>Mental State Analyzer</Text>
        <Text style={styles.sub}>
          This module summarizes emotional exposure, social withdrawal, and interaction signals.
        </Text>

        <SMRiskBadge
          level={riskLevel}
          hint="Mood signal and response patterns show moderate risk today."
        />

        <SMSectionTitle title="Quick Metrics" subtitle="A compact snapshot of today’s signals." />
        <SMMetricsGrid metrics={metrics} />

        <SMSectionTitle title="Actions" subtitle="Explore each analysis pillar." />

        <View style={{ gap: spacing.md }}>
          <PrimaryButton title="Daily Journal (Typing Stress Test)" onPress={() => navigation.navigate(SM_ROUTES.Journal)} />
          <PrimaryButton title="Notification Analysis (Emotional Filter)" onPress={() => navigation.navigate(SM_ROUTES.Notification)} style={{ backgroundColor: "rgba(14,165,233,0.60)" }} />
          <PrimaryButton title="Ghosting Detector (Response Latency)" onPress={() => navigation.navigate(SM_ROUTES.Ghosting)} style={{ backgroundColor: "rgba(34,197,94,0.60)" }} />
          <PrimaryButton title="Insights" onPress={() => navigation.navigate(SM_ROUTES.Insights)} />
          <PrimaryButton title="History" onPress={() => navigation.navigate(SM_ROUTES.History)} style={{ backgroundColor: "rgba(124,58,237,0.65)" }} />
          <PrimaryButton title="Privacy & Ethics" onPress={() => navigation.navigate(SM_ROUTES.Privacy)} style={{ backgroundColor: "rgba(255,255,255,0.10)" }} />
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </DashboardBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },
  brand: { color: colors.muted, fontWeight: "900", letterSpacing: 2.5 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900", marginTop: spacing.sm },
  sub: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.lg, lineHeight: 18 },
});
