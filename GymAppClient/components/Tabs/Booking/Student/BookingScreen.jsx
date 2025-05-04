import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASIC_API } from "../../../../utils/BASIC_API";

const fetchTrainers = async (searchQuery = '', selectedTags = []) => {
  try {
     const userToken = await AsyncStorage.getItem("userToken");
            console.log("User token:", userToken);

            
    const response = await fetch(`${BASIC_API}/coaches`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`, 
      },
    });
    
    if (!response.ok) {
      throw new Error('Не вдалося завантажити тренерів');
    }

    const data = await response.json();

    console.log(data);

    let filteredTrainers = data;

    if (searchQuery !== '') {
      filteredTrainers = filteredTrainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filteredTrainers = filteredTrainers.filter(trainer =>
        selectedTags.some(tag => trainer.tags && trainer.tags.includes(tag))
      );
    }

    return filteredTrainers;

  } catch (error) {
    console.error('Помилка завантаження тренерів:', error);
    return [];
  }
};

const TrainerItem = ({ trainer, onPress, navigation2 }) => {
  return (
    <TouchableOpacity style={styles.trainerItem} onPress={() => navigation2.navigate('Schedule')}>
      <Image source={{ uri: trainer.image || 'https://via.placeholder.com/80' }} style={styles.trainerImage} />
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerName}>{trainer.name}</Text>
        <Text style={styles.trainerSpecialization}>{trainer.specialization}</Text>
        <View style={styles.rateRow}>
          <Text style={styles.trainerRate}>1h = ${trainer.hourlyRate}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{trainer.rating}</Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {(trainer.tags || []).map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BookingScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async (query = '', tags = selectedTags) => {
    setLoading(true);
    try {
      const data = await fetchTrainers(query, tags);
      setTrainers(data);
    } catch (error) {
      console.error('Помилка завантаження тренерів:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    loadTrainers(text, selectedTags);
  };

  const handleTagPress = (tag) => {
    let newSelectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }
    setSelectedTags(newSelectedTags);
    loadTrainers(searchQuery, newSelectedTags);
  };

  const handleTrainerPress = (trainer) => {
    alert(`Ви обрали тренера: ${trainer.name}`);
  };


  const allTags = ['yoga', 'crossfit', 'boxing', 'pilates', 'zumba'];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Пошук тренера</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук за іменем або спеціалізацією"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#777" />
          </TouchableOpacity>
        )}
      </View>


      <View style={styles.tagsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScrollView}>

          {allTags.map((tag, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.tagButton, selectedTags.includes(tag) ? styles.tagSelected : {}]}
              onPress={() => handleTagPress(tag)}
            >
              <Text 
                style={[styles.tagButtonText, selectedTags.includes(tag) ? styles.tagTextSelected : {}]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Пошук тренерів...</Text>
        </View>
      ) : trainers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>
            Тренерів не знайдено. Спробуйте змінити критерії пошуку.
          </Text>
        </View>
      ) : (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.userId} 
          renderItem={({ item }) => (
            <TrainerItem trainer={item} onPress={handleTrainerPress} navigation2={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};
   
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  tagsSection: {
    marginBottom: 15,
  },
  tagsScrollView: {
    flexDirection: 'row',
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tagSelected: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  tagButtonText: {
    fontSize: 14,
    color: '#555',
  },
  tagTextSelected: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  trainerItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  trainerInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trainerSpecialization: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  trainerRate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tagBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginTop: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default BookingScreen;