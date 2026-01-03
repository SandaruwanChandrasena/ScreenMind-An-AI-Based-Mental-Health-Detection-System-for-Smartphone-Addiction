import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenBackground from "../../../components/ScreenBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import InsightRow from "../components/InsightRow";

export default function SleepDetailsScreen() {
  // Dummy reasons (later computed from collected data)
  const insights = [
    { good: false, icon: "✖", text: "Used phone 45 minutes after 11:00 PM" },
    { good: false, icon: "✖", text: "7 unlocks during estimated sleep window" },
    { good: false, icon: "✖", text: "12 notifications after bedtime" },
    { good: true, icon: "✔", text: "Charging started consistently around 10:45 PM" },
  ];

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What Affected Your Sleep?</Text>
        <Text style={styles.sub}>Explainable insights (not a diagnosis).</Text>

        <View style={styles.card}>
          {insights.map((i, idx) => (
            <InsightRow key={idx} icon={i.icon} text={i.text} good={i.good} />
          ))}
        </View>

        <View style={{ height: spacing.lg }} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>7-Day Trend (UI placeholder)</Text>
          <Text style={styles.cardText}>
            Add graphs later. For now, show this card in progress presentation.
          </Text>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
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
  cardTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
  cardText: { color: colors.muted, marginTop: 8, lineHeight: 18, fontSize: 13 },
});
