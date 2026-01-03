import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import ScreenBackground from "../../../components/ScreenBackground";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function DataPermissionsScreen() {
  // UI-only toggles for now
  const [usageAccess, setUsageAccess] = useState(false);
  const [notifAccess, setNotifAccess] = useState(false);
  const [dndAccess, setDndAccess] = useState(false);
  const [sensors, setSensors] = useState(false);

  const openSettings = (name) => {
    Alert.alert("UI only", `Later this will open Android Settings for: ${name}`);
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Data & Permissions</Text>
        <Text style={styles.sub}>Transparency improves trust and research quality.</Text>

        <View style={styles.card}>
          <Row
            title="Screen Usage Access"
            desc="Needed for app usage, switching & night activity."
            enabled={usageAccess}
            onToggle={() => setUsageAccess((p) => !p)}
            onAction={() => openSettings("Usage Access")}
          />
          <Divider />
          <Row
            title="Notification Access"
            desc="Needed to count notifications after bedtime."
            enabled={notifAccess}
            onToggle={() => setNotifAccess((p) => !p)}
            onAction={() => openSettings("Notification Access")}
          />
          <Divider />
          <Row
            title="Do Not Disturb Access"
            desc="Allows reading if DND is enabled."
            enabled={dndAccess}
            onToggle={() => setDndAccess((p) => !p)}
            onAction={() => openSettings("DND Access")}
          />
          <Divider />
          <Row
            title="Sensors (Optional)"
            desc="Light & motion signals can improve accuracy."
            enabled={sensors}
            onToggle={() => setSensors((p) => !p)}
            onAction={() => openSettings("Sensors")}
          />
        </View>

        <View style={{ height: spacing.lg }} />

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Accuracy Note</Text>
          <Text style={styles.noteText}>
            If some permissions are disabled, your sleep predictions may be less accurate. You can still use the app.
          </Text>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </ScreenBackground>
  );
}

function Row({ title, desc, enabled, onToggle, onAction }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDesc}>{desc}</Text>

        <Pressable onPress={onAction} style={{ marginTop: 10 }}>
          <Text style={styles.link}>Open Settings</Text>
        </Pressable>
      </View>

      <Pressable onPress={onToggle} style={[styles.toggle, enabled && styles.toggleOn]}>
        <Text style={styles.toggleText}>{enabled ? "ON" : "OFF"}</Text>
      </Pressable>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
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
  link: { color: colors.primary2, fontWeight: "900" },

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
  toggleOn: { backgroundColor: "rgba(34,197,94,0.22)" },
  toggleText: { color: colors.text, fontWeight: "900", fontSize: 12 },

  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14, opacity: 0.7 },

  note: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: spacing.lg,
  },
  noteTitle: { color: colors.text, fontWeight: "900" },
  noteText: { color: colors.muted, marginTop: 8, lineHeight: 18, fontSize: 12 },
});
