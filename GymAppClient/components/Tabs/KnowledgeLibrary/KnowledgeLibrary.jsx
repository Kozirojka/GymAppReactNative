import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KnowledgeLibrary = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>🔔 Notifications (Knowledge Library)</Text>
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

export default KnowledgeLibrary;
