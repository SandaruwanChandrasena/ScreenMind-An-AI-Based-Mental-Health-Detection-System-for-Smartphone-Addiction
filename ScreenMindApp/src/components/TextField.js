import React, { useState, forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../theme/colors";

const TextField = forwardRef(function TextField(
  {
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize = "none",
    returnKeyType = "next",
    onSubmitEditing,
    blurOnSubmit = false,
  },
  ref
) {
  const [show, setShow] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={colors.faint}
          secureTextEntry={isPassword ? !show : false}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShow((p) => !p)}
            style={styles.eyeBtn}
            hitSlop={10}
          >
            <Icon
              name={show ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { color: colors.muted, fontSize: 13, fontWeight: "700" },

  inputRow: {
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  eyeBtn: { paddingLeft: 10 },
});
