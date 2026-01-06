import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";

import { AuthContext } from "../context/AuthContext";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { colors } from "../theme/colors";

/* ✅ Isolation screens (ONLY ONCE — no duplicates) */
import IsolationOverviewScreen from "../features/isolation/screens/IsolationOverviewScreen";
import IsolationWhyScreen from "../features/isolation/screens/IsolationWhyScreen";
import IsolationInsightsScreen from "../features/isolation/screens/IsolationInsightsScreen";
import IsolationTrendsScreen from "../features/isolation/screens/IsolationTrendsScreen";
import IsolationSuggestionsScreen from "../features/isolation/screens/IsolationSuggestionsScreen";

/* ✅ NEW: Stats-style UI + detail screens */
import IsolationStatsScreen from "../features/isolation/screens/IsolationStatsScreen";
import MobilityInsightsScreen from "../features/isolation/screens/MobilityInsightsScreen";
import SocialInteractionScreen from "../features/isolation/screens/SocialInteractionScreen";
import BehaviourInsightsScreen from "../features/isolation/screens/BehaviourInsightsScreen";
import ProximityExposureScreen from "../features/isolation/screens/ProximityExposureScreen";
import IsolationPrivacyScreen from "../features/isolation/screens/IsolationPrivacyScreen";

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
        <ActivityIndicator size="large" color={colors.text} />
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
            {/* ✅ Main */}
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Home" }}
            />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile" }}
            />

            {/* ✅ Isolation module entry */}
            <Stack.Screen
              name="IsolationOverview"
              component={IsolationOverviewScreen}
              options={{ title: "Isolation" }}
            />

            {/* ✅ Stats screen (UI like your image) */}
            <Stack.Screen
              name="IsolationStats"
              component={IsolationStatsScreen}
              options={{ headerShown: false }}
            />

            {/* ✅ Explainability */}
            <Stack.Screen
              name="IsolationWhy"
              component={IsolationWhyScreen}
              options={{ title: "Why this risk?" }}
            />

            {/* ✅ Existing screens (keep) */}
            <Stack.Screen
              name="IsolationInsights"
              component={IsolationInsightsScreen}
              options={{ title: "Insights" }}
            />
            <Stack.Screen
              name="IsolationTrends"
              component={IsolationTrendsScreen}
              options={{ title: "Trends" }}
            />
            <Stack.Screen
              name="IsolationSuggestions"
              component={IsolationSuggestionsScreen}
              options={{ title: "Suggestions" }}
            />

            {/* ✅ NEW detail screens */}
            <Stack.Screen
              name="MobilityInsights"
              component={MobilityInsightsScreen}
              options={{ title: "Mobility" }}
            />
            <Stack.Screen
              name="SocialInteraction"
              component={SocialInteractionScreen}
              options={{ title: "Social Interaction" }}
            />
            <Stack.Screen
              name="BehaviourInsights"
              component={BehaviourInsightsScreen}
              options={{ title: "Behaviour" }}
            />
            <Stack.Screen
              name="ProximityExposure"
              component={ProximityExposureScreen}
              options={{ title: "Proximity" }}
            />

            {/* ✅ Privacy */}
            <Stack.Screen
              name="IsolationPrivacy"
              component={IsolationPrivacyScreen}
              options={{ title: "Privacy & Consent" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: "Sign In" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
