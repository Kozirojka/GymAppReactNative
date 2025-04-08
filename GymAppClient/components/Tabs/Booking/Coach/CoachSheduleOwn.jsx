import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const mockSchedule = [
  {
    date: '2025-04-08',
    intervals: [
      { start: '09:00', end: '10:00' },
      { start: '13:00', end: '14:30' },
    ],
  },
  {
    date: '2025-04-09',
    intervals: [
      { start: '10:00', end: '11:00' },
    ],
  },
  {
    date: '2025-04-10',
    intervals: [],
  },
];

const CoatchSheduleOwn = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSchedule(mockSchedule);
    }, 1000);
  }, []);

  const handleAddInterval = (date) => {
    Alert.alert('Додати інтервал', `Для дати ${date}`, [{ text: 'Ок' }]);

    setSchedule((prev) =>
      prev.map((day) =>
        day.date === date
          ? {
              ...day,
              intervals: [...day.intervals, { start: '15:00', end: '16:00' }],
            }
          : day
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.dayContainer}>
      <Text style={styles.dateText}>{item.date}</Text>
      {item.intervals.length > 0 ? (
        item.intervals.map((interval, i) => (
          <Text key={i} style={styles.intervalText}>
            🕒 {interval.start} - {interval.end}
          </Text>
        ))
      ) : (
        <Text style={styles.noIntervals}>Немає інтервалів</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddInterval(item.date)}
      >
        <Text style={styles.addButtonText}>➕ Додати інтервал</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Розклад тренера</Text>
      <FlatList
        data={schedule}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CoatchSheduleOwn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  dayContainer: {
    width: screenWidth - 40,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
  },
  intervalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  noIntervals: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 15,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00aaff',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
