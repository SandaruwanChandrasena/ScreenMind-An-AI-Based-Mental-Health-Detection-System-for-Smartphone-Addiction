import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../context/AuthContext";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);

  const passRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await signIn({ email: email.trim(), password });
      Keyboard.dismiss();
    } catch (e) {
      Alert.alert("Sign In failed", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.brand}>Welcome back</Text>
              <Text style={styles.title}>Sign in</Text>
              <Text style={styles.subtitle}>Continue where you left off.</Text>
            </View>

            <View style={styles.card}>
              <TextField
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
                blurOnSubmit={false}
              />

              <View style={{ height: spacing.sm }} />

              <TextField
                ref={passRef}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                blurOnSubmit={true}
              />

              <Pressable
                onPress={() => Alert.alert("Not implemented", "Password reset coming soon.")}
                style={styles.forgotWrap}
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </Pressable>

              <View style={{ height: spacing.md }} />

              <PrimaryButton
                title={loading ? "Signing in..." : "Sign In"}
                onPress={onSubmit}
                disabled={loading}
              />
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>New here?</Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.bottomLink}> Create account</Text>
              </Pressable>
            </View>

            <View style={{ height: spacing.xxl }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg1 },
  container: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },

  header: { marginTop: spacing.lg, marginBottom: spacing.xl },
  brand: { color: colors.muted, fontWeight: "800", letterSpacing: 0.6 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 8 },
  subtitle: { color: colors.muted, marginTop: 8, fontSize: 14, lineHeight: 20 },

  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },

  forgotWrap: { marginTop: spacing.sm, alignSelf: "flex-end" },
  forgot: { color: colors.primary2, fontWeight: "700" },

  bottomRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  bottomText: { color: colors.muted },
  bottomLink: { color: colors.primary2, fontWeight: "800" },

  bgGlow1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: "#22C55E",
    opacity: 0.12,
    top: -120,
    left: -120,
  },
  bgGlow2: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "#7C3AED",
    opacity: 0.16,
    bottom: -160,
    right: -140,
  },
});
