import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const IntervalsDetails = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Intervals Details</Text>
            <Text style={styles.text}>Details about the selected intervals will be displayed here.</Text>
        </View>
    )
};

export default IntervalsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});
