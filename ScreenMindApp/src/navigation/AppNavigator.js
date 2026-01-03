import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";

import SleepHomeScreen from "../features/sleep/screens/SleepHomeScreen";
import MorningCheckInScreen from "../features/sleep/screens/MorningCheckInScreen";
import SleepDetailsScreen from "../features/sleep/screens/SleepDetailsScreen";
import DataPermissionsScreen from "../features/sleep/screens/DataPermissionsScreen";
import SnoringScreen from "../features/sleep/screens/SnoringScreen";



import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { colors } from "../theme/colors";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg1 },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "900" },
          headerShadowVisible: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Home" }}
            />

            <Stack.Screen
              name="SleepHome"
              component={SleepHomeScreen}
              options={{ title: "Sleep" }}
            />

            <Stack.Screen
              name="SleepCheckIn"
              component={MorningCheckInScreen}
              options={{ title: "Morning Check-In" }}
            />

            <Stack.Screen
              name="SleepDetails"
              component={SleepDetailsScreen}
              options={{ title: "Sleep Details" }}
            />

            <Stack.Screen
              name="SleepPermissions"
              component={DataPermissionsScreen}
              options={{ title: "Data & Permissions" }}
            />

            <Stack.Screen
              name="SleepSnoring"
              component={SnoringScreen}
              options={{ title: "Snoring" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Sign In" }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
