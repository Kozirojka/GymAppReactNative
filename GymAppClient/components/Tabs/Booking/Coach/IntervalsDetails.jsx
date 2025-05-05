import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// це є деталі про інтервал. цей екран відкривається
//  коли користувач натискає на інтервал у списку
const IntervalsDetails = ({ route }) => {
    const { interval: { start, end }, date } = route.params;
       
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📅 Деталі Інтервалу</Text>
        <Text style={styles.text}>Дата: {date}</Text>
        <Text style={styles.text}>Початок: {start}</Text>
        <Text style={styles.text}>Кінець: {end}</Text>
      </View>
    );
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
