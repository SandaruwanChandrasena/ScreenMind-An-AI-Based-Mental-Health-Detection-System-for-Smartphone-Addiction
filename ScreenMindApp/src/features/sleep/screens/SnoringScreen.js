import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import ScreenBackground from "../../../components/ScreenBackground";
import PrimaryButton from "../../../components/PrimaryButton";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function SnoringScreen() {
  const [enabled, setEnabled] = useState(false);
  const [sessionRunning, setSessionRunning] = useState(false);

  const toggleEnabled = () => setEnabled((p) => !p);

  const startStop = () => {
    if (!enabled) {
      Alert.alert("Enable first", "Turn on snoring detection to start a sleep session.");
      return;
    }
    setSessionRunning((p) => !p);
    Alert.alert("UI only", "Later this will start/stop audio analysis on-device.");
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Snoring (Optional)</Text>
        <Text style={styles.sub}>Processed on-device. No audio is stored.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Enable Snoring Detection</Text>
              <Text style={styles.rowDesc}>
                Optional feature to estimate snoring duration and intensity. Not a medical diagnosis.
              </Text>
            </View>

            <Pressable onPress={toggleEnabled} style={[styles.toggle, enabled && styles.toggleOn]}>
              <Text style={styles.toggleText}>{enabled ? "ON" : "OFF"}</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.summaryTitle}>Last Night Summary (Dummy)</Text>
          <View style={styles.summaryGrid}>
            <SummaryItem label="Snoring" value="Moderate" />
            <SummaryItem label="Duration" value="28 min" />
            <SummaryItem label="Intensity" value="Medium" />
            <SummaryItem label="Events" value="12" />
          </View>

          <View style={{ height: spacing.md }} />
          <PrimaryButton title={sessionRunning ? "Stop Sleep Session" : "Start Sleep Session"} onPress={startStop} />
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
  );
}

function SummaryItem({ label, value }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },

  title: { color: colors.text, fontSize: 24, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: 6, marginBottom: spacing.lg, lineHeight: 18 },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.lg,
  },

  row: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  rowTitle: { color: colors.text, fontWeight: "900", fontSize: 14 },
  rowDesc: { color: colors.muted, marginTop: 6, lineHeight: 18, fontSize: 12 },

  toggle: {
    width: 64,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleOn: { backgroundColor: "rgba(124,58,237,0.22)" },
  toggleText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14, opacity: 0.7 },

  summaryTitle: { color: colors.text, fontWeight: "900", marginBottom: 10 },
  summaryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  summaryItem: {
    width: "47%",
    borderRadius: 16,
    padding: 12,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryLabel: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  summaryValue: { color: colors.text, fontSize: 16, fontWeight: "900", marginTop: 6 },
});
