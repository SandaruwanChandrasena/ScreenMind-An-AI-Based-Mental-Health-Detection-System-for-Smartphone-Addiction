import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import ScreenBackground from "../../../components/ScreenBackground";
import PrimaryButton from "../../../components/PrimaryButton";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function MorningCheckInScreen({ navigation }) {
  const [quality, setQuality] = useState(3); // 1–5
  const [sleepTime, setSleepTime] = useState("23:30");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [wokeUp, setWokeUp] = useState("No");
  const [snoreUsed, setSnoreUsed] = useState("No");

  const submit = () => {
    // Front-end only: later send to Google server / backend
    Alert.alert("Saved ✅", "Sleep check-in recorded.");
    navigation.goBack();
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Morning Check-In</Text>
        <Text style={styles.sub}>This helps train & validate your model.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Sleep quality (1–5)</Text>
          <View style={styles.chipsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable
                key={n}
                onPress={() => setQuality(n)}
                style={[styles.chip, quality === n && styles.chipActive]}
              >
                <Text style={[styles.chipText, quality === n && styles.chipTextActive]}>{n}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{ height: spacing.md }} />

          <Text style={styles.label}>Fell asleep at (approx)</Text>
          <View style={styles.fakeInput}>
            <Text style={styles.fakeInputText}>{sleepTime}</Text>
          </View>
          <Text style={styles.helper}>For now type value later with time picker.</Text>

          <View style={{ height: spacing.md }} />

          <Text style={styles.label}>Woke up at</Text>
          <View style={styles.fakeInput}>
            <Text style={styles.fakeInputText}>{wakeTime}</Text>
          </View>

          <View style={{ height: spacing.md }} />

          <Text style={styles.label}>Woke during night?</Text>
          <View style={styles.toggleRow}>
            <Choice value={wokeUp} setValue={setWokeUp} a="Yes" b="No" />
          </View>

          <View style={{ height: spacing.md }} />

          <Text style={styles.label}>Used snoring detection last night?</Text>
          <View style={styles.toggleRow}>
            <Choice value={snoreUsed} setValue={setSnoreUsed} a="Yes" b="No" />
          </View>

          <View style={{ height: spacing.lg }} />
          <PrimaryButton title="Save" onPress={submit} />
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
  );
}

function Choice({ value, setValue, a, b }) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {[a, b].map((opt) => (
        <Pressable
          key={opt}
          onPress={() => setValue(opt)}
          style={[
            styles.choice,
            value === opt && { backgroundColor: "rgba(124,58,237,0.22)", borderColor: colors.border },
          ]}
        >
          <Text style={[styles.choiceText, value === opt && { color: colors.text }]}>{opt}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingTop: spacing.xxl, flexGrow: 1 },

  title: { color: colors.text, fontSize: 26, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: 6, marginBottom: spacing.lg, lineHeight: 18 },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.lg,
  },

  label: { color: colors.muted, fontSize: 13, fontWeight: "800", marginBottom: 10 },

  chipsRow: { flexDirection: "row", gap: 10 },
  chip: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: "rgba(34,197,94,0.20)" },
  chipText: { color: colors.muted, fontWeight: "900" },
  chipTextActive: { color: colors.text },

  fakeInput: {
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  fakeInputText: { color: colors.text, fontSize: 15, fontWeight: "800" },
  helper: { color: colors.faint, fontSize: 11, marginTop: 6 },

  toggleRow: { marginTop: -2 },

  choice: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  choiceText: { color: colors.muted, fontWeight: "900" },
});
