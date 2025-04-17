import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../GymAppClient/components/RootStack';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}