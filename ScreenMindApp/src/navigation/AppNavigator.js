import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


import IsolationOverviewScreen from "../features/isolation/screens/IsolationOverviewScreen";
import IsolationWhyScreen from "../features/isolation/screens/IsolationWhyScreen";
import IsolationInsightsScreen from "../features/isolation/screens/IsolationInsightsScreen";
import IsolationTrendsScreen from "../features/isolation/screens/IsolationTrendsScreen";
import IsolationSuggestionsScreen from "../features/isolation/screens/IsolationSuggestionsScreen";


import { AuthContext } from "../context/AuthContext";

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

            {/* ✅ Isolation Module Screens */}
            <Stack.Screen
              name="IsolationOverview"
              component={IsolationOverviewScreen}
              options={{ title: "Isolation" }}
            />
            <Stack.Screen
              name="IsolationWhy"
              component={IsolationWhyScreen}
              options={{ title: "Why this risk?" }}
            />
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
