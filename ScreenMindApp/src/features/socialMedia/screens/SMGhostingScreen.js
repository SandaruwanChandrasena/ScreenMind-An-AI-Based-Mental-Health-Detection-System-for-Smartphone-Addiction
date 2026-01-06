import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardBackground from "../../../components/DashboardBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import SMSectionTitle from "../components/SMSectionTitle";
import SMMiniCard from "../components/SMMiniCard";
import { formatMinutes } from "../utils/sm.formatters";
import Slider from "@react-native-community/slider"; // ✅ add this package if not installed

export default function SMGhostingScreen() {
  // ✅ placeholder stats (later replace with backend)
  const avgLatencyMin = 95;
  const maxLatencyMin = 360;

  // ✅ user-adjustable definition of “late reply”
  const [lateThresholdHours, setLateThresholdHours] = useState(6);
  const lateThresholdMin = Math.round(lateThresholdHours * 60);

  // ✅ mock weekly latency trend (minutes)
  const weeklyAvg = [70, 85, 120, 95, 160, 110, 95];

  // ✅ late replies count (placeholder)
  const lateReplies = useMemo(() => {
    // if you had real per-reply latency, you'd count those > threshold
    // for now: derive a simple number from avg/max/threshold so UI behaves
    if (maxLatencyMin < lateThresholdMin) return 0;
    if (avgLatencyMin < lateThresholdMin) return 2;
    return 4;
  }, [avgLatencyMin, maxLatencyMin, lateThresholdMin]);

  // ✅ derive risk level from values
  const risk = useMemo(() => {
    // "High" if very slow + many late replies
    if (avgLatencyMin >= 240 || lateReplies >= 5 || maxLatencyMin >= 720) return "HIGH";
    // "Moderate" if often slow
    if (avgLatencyMin >= 90 || lateReplies >= 2 || maxLatencyMin >= 360) return "MODERATE";
    return "LOW";
  }, [avgLatencyMin, lateReplies, maxLatencyMin]);

  const riskUI = useMemo(() => {
    const map = {
      LOW: {
        bg: "rgba(34,197,94,0.14)",
        text: "#22C55E",
        label: "Low withdrawal risk today.",
        tint: "rgba(34,197,94,0.18)",
      },
      MODERATE: {
        bg: "rgba(255,184,0,0.14)",
        text: "#FFB800",
        label: "Moderate withdrawal signals detected.",
        tint: "rgba(255,184,0,0.18)",
      },
      HIGH: {
        bg: "rgba(239,68,68,0.14)",
        text: "#EF4444",
        label: "High withdrawal risk — consistent delayed replies.",
        tint: "rgba(239,68,68,0.18)",
      },
    };
    return map[risk];
  }, [risk]);

  // ✅ mini bar chart (no library)
  const maxTrend = Math.max(...weeklyAvg, 1);

  return (
    <DashboardBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>GHOSTING DETECTOR</Text>
        <Text style={styles.title}>Response Latency</Text>
        <Text style={styles.sub}>
          Measures delay between receiving a message and opening the app to respond.
        </Text>

        {/* ✅ Risk banner */}
        <View style={[styles.banner, { backgroundColor: riskUI.bg }]}>
          <Text style={[styles.bannerText, { color: riskUI.text }]}>{riskUI.label}</Text>
        </View>

        <SMSectionTitle title="Latency Metrics" subtitle="Placeholders until usage tracking is connected." />

        <View style={styles.row}>
          <SMMiniCard
            label="Average"
            value={formatMinutes(avgLatencyMin)}
            sub="Today"
            tint="rgba(0,221,187,0.16)"
          />
          <SMMiniCard
            label="Maximum"
            value={formatMinutes(maxLatencyMin)}
            sub="Today"
            tint="rgba(59,130,246,0.16)"
          />
        </View>

        <View style={{ height: spacing.md }} />

        <View style={styles.row}>
          <SMMiniCard
            label="Late replies"
            value={lateReplies.toString()}
            sub={`> ${lateThresholdHours.toFixed(0)} hours`}
            tint="rgba(123,77,255,0.16)"
          />
          <SMMiniCard
            label="Status"
            value={risk === "LOW" ? "Low" : risk === "MODERATE" ? "Moderate" : "High"}
            sub="Withdrawal risk"
            tint={riskUI.tint}
          />
        </View>

        <SMSectionTitle title="Late Reply Threshold" subtitle="Adjust what counts as a late response." />

        <View style={styles.sliderCard}>
          <View style={styles.sliderTop}>
            <Text style={styles.sliderLabel}>Threshold</Text>
            <View style={[styles.pill, { backgroundColor: "rgba(255,255,255,0.06)" }]}>
              <Text style={styles.pillText}>{lateThresholdHours.toFixed(0)}h</Text>
            </View>
          </View>

          <Slider
            value={lateThresholdHours}
            minimumValue={1}
            maximumValue={12}
            step={1}
            onValueChange={setLateThresholdHours}
            minimumTrackTintColor={riskUI.text}
            maximumTrackTintColor={"rgba(255,255,255,0.12)"}
            thumbTintColor={riskUI.text}
          />

          <Text style={styles.sliderHint}>
            Replies slower than this may indicate avoidance or social withdrawal.
          </Text>
        </View>

        <SMSectionTitle title="7-Day Trend" subtitle="Average daily response time (mock trend)." />

        <View style={styles.trendCard}>
          <View style={styles.trendBars}>
            {weeklyAvg.map((v, i) => {
              const h = Math.max(6, Math.round((v / maxTrend) * 56));
              return <View key={i} style={[styles.bar, { height: h }]} />;
            })}
          </View>
          <Text style={styles.trendHint}>
            A rising trend across multiple days increases withdrawal risk.
          </Text>
        </View>

        <SMSectionTitle title="Interpretation" subtitle="How this affects your overall score." />

        <View style={styles.card}>
          <Text style={styles.cardText}>
            If response latency stays above your threshold for multiple days, the system can flag a higher
            social withdrawal risk and increase the overall risk score.
          </Text>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </DashboardBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },
  brand: { color: colors.muted, fontWeight: "900", letterSpacing: 2.5 },
  title: { color: colors.text, fontSize: 24, fontWeight: "900", marginTop: spacing.sm },
  sub: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.md, lineHeight: 18 },

  row: { flexDirection: "row", gap: spacing.md },

  banner: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: spacing.md,
  },
  bannerText: { fontWeight: "900", fontSize: 12, letterSpacing: 0.2 },

  sliderCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.md,
  },
  sliderTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sliderLabel: { color: colors.text, fontWeight: "900", fontSize: 13 },
  sliderHint: { color: colors.muted, marginTop: spacing.sm, fontSize: 12, lineHeight: 16 },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  pillText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  trendCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.md,
  },
  trendBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    height: 64,
    marginTop: 4,
  },
  bar: {
    width: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  trendHint: { color: colors.muted, marginTop: spacing.sm, fontSize: 12, lineHeight: 16 },

  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.md,
  },
  cardText: { color: colors.muted, lineHeight: 20 },
});
