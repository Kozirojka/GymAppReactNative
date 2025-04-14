import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const exercises = [
  {
    id: "1",
    title: "Straight Sets",
    tags: ["saved"],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Progressive Overload",
    tags: ["saved"],
    youtubeUrl: "https://www.youtube.com/watch?v=UoC_O3HzsH0",
  },
  {
    id: "3",
    title: "Drop Sets",
    tags: ["saved"],
    youtubeUrl: "https://www.youtube.com/watch?v=F2f5E4WZtB8",
  },
  {
    id: "4",
    title: "Supersets",
    tags: [],
    youtubeUrl: "https://www.youtube.com/watch?v=tUQdQ9O8Gxg",
  },
];

const screenWidth = Dimensions.get("window").width;

const KnowledgeLibrary = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(["saved"]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredExercises = exercises.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.every((tag) => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ExerciseDetails", { exercise: item })}
    >
      <Text style={styles.star}>★</Text>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Find the set: "Chest set"'
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.tagsContainer}>
        <TouchableOpacity
          onPress={() => toggleTag("saved")}
          style={[
            styles.tag,
            selectedTags.includes("saved") && styles.tagSelected,
          ]}
        >
          <Text style={styles.tagText}>saved ✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTag("new")}
          style={[
            styles.tag,
            selectedTags.includes("new") && styles.tagSelected,
          ]}
        >
          <Text style={styles.tagText}>+ new</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const cardSize = (screenWidth - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchBar: {
    backgroundColor: "#f0ebf5",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagSelected: {
    backgroundColor: "#b89ee3",
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  list: {
    gap: 20,
  },
  card: {
    width: cardSize,
    height: cardSize,
    backgroundColor: "#ddd",
    borderRadius: 12,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  star: {
    position: "absolute",
    top: 10,
    right: 12,
    fontSize: 20,
    color: "#333",
  },
});

export default KnowledgeLibrary;
