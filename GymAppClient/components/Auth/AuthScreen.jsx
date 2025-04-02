import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Auth screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
