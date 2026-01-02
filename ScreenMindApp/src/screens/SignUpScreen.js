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

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing info", "Please enter name, email, and password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await signUp({ name: name.trim(), email: email.trim(), password });
      Keyboard.dismiss();
    } catch (e) {
      Alert.alert("Sign Up failed", e?.message ?? "Something went wrong");
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
              <Text style={styles.brand}>ScreenMind</Text>
              <Text style={styles.title}>Create your account</Text>
              <Text style={styles.subtitle}>Sign up to start your journey.</Text>
            </View>

            <View style={styles.card}>
              <TextField
                label="Full Name"
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                blurOnSubmit={false}
              />

              <View style={{ height: spacing.sm }} />

              <TextField
                ref={emailRef}
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

              <View style={{ height: spacing.lg }} />

              <PrimaryButton
                title={loading ? "Creating..." : "Sign Up"}
                onPress={onSubmit}
                disabled={loading}
              />
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.bottomLink}> Sign In</Text>
              </Pressable>
            </View>

            <Text style={styles.footer}>
              By continuing you agree to our Terms & Privacy Policy.
            </Text>

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
  brand: { color: colors.muted, fontWeight: "800", letterSpacing: 1.2 },
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

  bottomRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  bottomText: { color: colors.muted },
  bottomLink: { color: colors.primary2, fontWeight: "800" },

  footer: { color: colors.faint, textAlign: "center", marginTop: spacing.md, fontSize: 12, lineHeight: 16 },

  bgGlow1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: "#7C3AED",
    opacity: 0.18,
    top: -120,
    left: -120,
  },
  bgGlow2: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "#22C55E",
    opacity: 0.12,
    bottom: -160,
    right: -140,
  },
});
