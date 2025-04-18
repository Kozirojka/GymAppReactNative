import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
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

const KnowledgeLibrary = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(["saved"]);
  const { width } = useWindowDimensions();
  
  const containerPadding = 20;
  const columnGap = 16;
  const numColumns = 2;
  const cardWidth = (width - (containerPadding * 2) - ((numColumns - 1) * columnGap)) / numColumns;

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredExercises = exercises.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some((tag) => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          width: cardWidth, 
          height: cardWidth,
          marginLeft: index % numColumns !== 0 ? columnGap : 0
        }
      ]}
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
          <Text style={[styles.tagText, selectedTags.includes("saved") && styles.tagTextSelected]}>saved ✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTag("new")}
          style={[
            styles.tag,
            selectedTags.includes("new") && styles.tagSelected,
          ]}
        >
          <Text style={[styles.tagText, selectedTags.includes("new") && styles.tagTextSelected]}>+ new</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

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
    marginBottom: 16,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  tagSelected: {
    backgroundColor: "#b89ee3",
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  tagTextSelected: {
    color: "#fff",
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  star: {
    position: "absolute",
    top: 10,
    right: 12,
    fontSize: 20,
    color: "#b89ee3",
  },
});

export default KnowledgeLibrary;