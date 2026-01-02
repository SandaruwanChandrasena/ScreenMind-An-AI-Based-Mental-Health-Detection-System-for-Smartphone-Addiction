import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../context/AuthContext';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';

import { colors } from '../theme/colors';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg1 }}>
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
          headerTitleStyle: { fontWeight: '800' },
        }}
      >
        {user ? (
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Home' }}
          />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
