import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>⚙️ Settings (Booking) Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingScreen;
