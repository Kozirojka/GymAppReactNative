import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BASIC_API } from "../../../utils/BASIC_API";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getColor = (count) => {
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
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("User token:", userToken);

        const response = await fetch(`${BASIC_API}/contribution`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        console.log(result);

        const weeksMap = Array(52).fill(0);

        result.forEach((contribution) => {
          const contributionDate = new Date(contribution.date);
          const now = new Date();
          const diffInDays = Math.floor((now - contributionDate) / (1000 * 60 * 60 * 24));
          const weekIndex = Math.floor(diffInDays / 7);

          if (weekIndex >= 0 && weekIndex < 52) {
            weeksMap[51 - weekIndex] += contribution.amount; 
          }
        });

        const formattedData = weeksMap.map((count, i) => ({
          week: i + 1,
          count,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
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
