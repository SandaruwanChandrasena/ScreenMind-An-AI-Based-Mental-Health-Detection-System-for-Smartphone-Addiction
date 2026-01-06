import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import DashboardBackground from "../../../components/DashboardBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import SMSectionTitle from "../components/SMSectionTitle";
import SMMiniCard from "../components/SMMiniCard";

export default function SMNotificationAnalysisScreen() {
  // ✅ UI-only setting for now (later: connect to permission + backend listener)
  const [notifAccessEnabled, setNotifAccessEnabled] = useState(false);

  // dummy placeholders (later replace from backend)
  const overallTone = "Mixed";
  const tone = "high"; // "low" | "moderate" | "high"

  const toneConfig = {
    low: {
      bg: "rgba(34,197,94,0.18)",
      text: "#22C55E",
      label: "Low risk detected today.",
    },
    moderate: {
      bg: "rgba(255,184,0,0.18)",
      text: "#FFB800",
      label: "Mixed emotional signals detected.",
    },
    high: {
      bg: "rgba(239,68,68,0.18)",
      text: "#EF4444",
      label: "Higher negative signals detected today.",
    },
  };

  const toneUI = toneConfig[tone];

  const statusUI = useMemo(() => {
    return notifAccessEnabled
      ? {
          label: "ON",
          bg: "rgba(34,197,94,0.16)",
          text: "#22C55E",
          hint: "Notification analysis is enabled.",
        }
      : {
          label: "OFF",
          bg: "rgba(239,68,68,0.14)",
          text: "#EF4444",
          hint: "Enable to allow reading notifications for analysis.",
        };
  }, [notifAccessEnabled]);

  return (
    <DashboardBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>EMOTIONAL FILTER</Text>
        <Text style={styles.title}>Notification Analysis</Text>
        <Text style={styles.sub}>
          Summarizes emotional exposure from incoming social notifications (no raw messages shown).
        </Text>

        <SMSectionTitle
          title="Today Summary"
          subtitle="Placeholders until the listener + backend are connected."
        />

        {/* ✅ Premium Today Summary Container */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryTitle}>Overall Tone</Text>
              <Text style={styles.summaryValue}>{overallTone}</Text>

              <View style={[styles.toneBadge, { backgroundColor: toneUI.bg }]}>
                <Text style={[styles.toneText, { color: toneUI.text }]} numberOfLines={2}>
                  {toneUI.label}
                </Text>
              </View>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>Today</Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />

          <View style={styles.row}>
            <SMMiniCard label="Negative" value="6" sub="Msgs detected" tint="rgba(239,68,68,0.24)" />
            <SMMiniCard label="Positive" value="3" sub="Msgs detected" tint="rgba(34,197,94,0.24)" />
          </View>

          <View style={{ height: spacing.md }} />

          <View style={styles.row}>
            <SMMiniCard label="Absolutist" value="2" sub="Markers seen" tint="rgba(124,58,237,0.26)" />
            <SMMiniCard label="Masking" value="No" sub="Emoji conflict" tint="rgba(14,165,233,0.24)" />
          </View>
        </View>

        <SMSectionTitle
          title="Ethics Note"
          subtitle="Only derived scores should be stored (sentiment score, counts), not message content."
        />

        {/* ✅ New: Settings section */}
        <View style={styles.settingsCard}>
          <View style={styles.settingsTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Notification Access</Text>
              <Text style={styles.settingsSub}>
                Allow ScreenMind to analyze social notifications using derived signals only.
              </Text>
            </View>

            {/* Status badge */}
            <View style={[styles.statusBadge, { backgroundColor: statusUI.bg }]}>
              <Text style={[styles.statusText, { color: statusUI.text }]}>{statusUI.label}</Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Enable notification analysis</Text>

            <Switch
              value={notifAccessEnabled}
              onValueChange={setNotifAccessEnabled}
              trackColor={{ false: "rgba(255,255,255,0.14)", true: "rgba(34,197,94,0.35)" }}
              thumbColor={notifAccessEnabled ? "#22C55E" : "#9CA3AF"}
            />
          </View>

          <Text style={styles.statusHint}>{statusUI.hint}</Text>

          <View style={styles.divider} />

          <Text style={styles.bullets}>
            • No message content is stored{"\n"}
            • Sender names should be anonymized{"\n"}
            • Only counts + timestamps are saved
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

  summaryCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  summaryTop: { flexDirection: "row", alignItems: "flex-start" },
  summaryTitle: { color: colors.muted, fontSize: 13, fontWeight: "800" },
  summaryValue: { color: colors.text, fontSize: 22, fontWeight: "900", marginTop: 6 },

  toneBadge: {
    marginTop: spacing.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  toneText: { fontSize: 12, fontWeight: "800", letterSpacing: 0.2, lineHeight: 16 },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,224,255,0.10)",
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: spacing.md,
  },
  pillText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  row: { flexDirection: "row", gap: spacing.md },

  // ✅ Settings card
  settingsCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.md,
  },
  settingsTop: { flexDirection: "row", alignItems: "flex-start" },
  settingsTitle: { color: colors.text, fontWeight: "900", fontSize: 14 },
  settingsSub: { color: colors.muted, marginTop: 6, fontSize: 12, lineHeight: 16 },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginLeft: spacing.md,
  },
  statusText: { fontWeight: "900", fontSize: 12, letterSpacing: 0.4 },

  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  switchLabel: { color: colors.text, fontWeight: "800", fontSize: 13 },

  statusHint: { color: colors.faint, marginTop: 8, fontSize: 12, lineHeight: 16 },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginVertical: spacing.md,
  },

  bullets: { color: colors.muted, lineHeight: 20 },
});
