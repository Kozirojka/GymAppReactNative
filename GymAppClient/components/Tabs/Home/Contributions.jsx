import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const getColor = (count) => {
  if (count === 0) return "#ebedf0";
  if (count < 2) return "#c6e48b";
  if (count < 4) return "#7bc96f";
  if (count < 6) return "#239a3b";
  return "#196127";
};

const Contributions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mockData = Array.from({ length: 52 }, (_, i) => ({
        week: i + 1,
        count: Math.floor(Math.random() * 8), 
      }));

      setTimeout(() => {
        setData(mockData);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏋️‍♂️ Gym Activity (52 тижні)</Text>
      <View style={styles.grid}>
        {data.map((week, index) => (
          <View
            key={index}
            style={[styles.square, { backgroundColor: getColor(week.count) }]}
          />
        ))}
      </View>
    </View>
  );
};
    
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 260,
  },
  square: {
    width: 10,
    height: 10,
    margin: 2,
    borderRadius: 2,
  },
});

export default Contributions;
