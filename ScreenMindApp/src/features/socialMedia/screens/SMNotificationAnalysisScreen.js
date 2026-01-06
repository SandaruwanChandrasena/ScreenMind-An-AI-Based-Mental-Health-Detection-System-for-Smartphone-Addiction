import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardBackground from "../../../components/DashboardBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import SMSectionTitle from "../components/SMSectionTitle";
import SMMiniCard from "../components/SMMiniCard";

export default function SMNotificationAnalysisScreen() {
  return (
    <DashboardBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>EMOTIONAL FILTER</Text>
        <Text style={styles.title}>Notification Analysis</Text>
        <Text style={styles.sub}>
          Summarizes emotional exposure from incoming social notifications (no raw messages shown).
        </Text>

        <SMSectionTitle title="Today Summary" subtitle="Placeholders until the listener + backend are connected." />

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <SMMiniCard label="Negative" value="6" sub="Msgs detected" tint="rgba(239,68,68,0.18)" />
          <SMMiniCard label="Positive" value="3" sub="Msgs detected" tint="rgba(34,197,94,0.18)" />
        </View>

        <View style={{ height: spacing.md }} />

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <SMMiniCard label="Absolutist" value="2" sub="Markers seen" tint="rgba(124,58,237,0.22)" />
          <SMMiniCard label="Masking" value="No" sub="Emoji conflict" tint="rgba(14,165,233,0.18)" />
        </View>

        <SMSectionTitle
          title="Ethics Note"
          subtitle="Only derived scores should be stored (sentiment score, counts), not message content."
        />

        <View style={styles.card}>
          <Text style={styles.cardText}>
            • No raw messages are displayed here.{"\n"}
            • In final integration, sender names should be anonymized.{"\n"}
            • Store only numerical signals and timestamps.
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
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.md,
  },
  cardText: { color: colors.muted, lineHeight: 20 },
});
