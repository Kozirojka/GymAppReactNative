import React, { useState, useEffect } from "react";
import EditAddInterval from "./EditAddInterval";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
const screenWidth = Dimensions.get("window").width;

const mockSchedule = [
  {
    date: "2025-04-08",
    intervals: [
      { start: "09:00", end: "10:00", userId: null },
      { start: "13:00", end: "14:30", userId: 1 },
    ],
  },
  {
    date: "2025-04-09",
    intervals: [{ start: "10:00", end: "11:00", userId: 2 }],
  },
  {
    date: "2025-04-10",
    intervals: [],
  },
];

const CoatchSheduleOwn = ({ navigation }) => {
    const [schedule, setSchedule] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [overlayVisible, setOverlayVisible] = useState(false);
  
    useEffect(() => {
      setTimeout(() => {
        setSchedule(mockSchedule);
      }, 1000);
    }, []);
  
    const handleAddInterval = (newInterval) => {
      const currentDate = schedule[currentIndex]?.date;
      if (!currentDate) return;
  
      setSchedule((prev) =>
        prev.map((day) =>
          day.date === currentDate
            ? {
                ...day,
                intervals: [
                  ...day.intervals,
                  {
                    start: newInterval.start,
                    end: newInterval.end,
                    price: newInterval.price || null,
                  },
                ],
              }
            : day
        )
      );
    };
  
    const getIntervalStyle = (userId) => ({
      backgroundColor: userId === null ? '#4da6ff' : '#80d4a0',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 8,
    });
  
    const renderItem = ({ item }) => (
      <View style={styles.dayContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
  
        {item.intervals.length > 0 ? (
          item.intervals.map((interval, i) => (
            <TouchableOpacity
              key={i}
              style={getIntervalStyle(interval.userId)}
              onPress={() =>
                navigation.navigate('IntervalsDetails', {
                  interval,
                  date: item.date,
                })
              }
            >
              <Text style={styles.intervalText}>
                🕒 {interval.start} - {interval.end}
              </Text>
              {interval.userId !== null && (
                <Text style={styles.assignedText}>
                  👤 Прикріплено: {interval.userId}
                </Text>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noIntervals}>Немає інтервалів</Text>
        )}
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
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / screenWidth
            );
            setCurrentIndex(newIndex);
          }}
        />
  
        <TouchableOpacity style={styles.addButton} onPress={() => setOverlayVisible(true)}>
          <Text style={styles.addButtonText}>➕ Додати інтервал</Text>
        </TouchableOpacity>
  
        <EditAddInterval 
          visible={overlayVisible} 
          onClose={() => setOverlayVisible(false)} 
          onAddInterval={handleAddInterval} 
        />
      </View>
    );
  };
  
  export default CoatchSheduleOwn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  dayContainer: {
    width: screenWidth - 40,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "flex-start",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#444",
    textAlign: "center",
  },
  intervalText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  noIntervals: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 15,
    textAlign: "center",
  },
  assignedText: {
    fontSize: 13,
    color: "#f0f0f0",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#00aaff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
