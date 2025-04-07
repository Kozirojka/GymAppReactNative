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

const mockTrainers = [
  {
    id: '1',
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Fitness, Strength Training',
    hourlyRate: 25,
    rating: 4.8,
    tags: ['man', 'fitness', 'strength']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Boxing, HIIT',
    hourlyRate: 30,
    rating: 4.9,
    tags: ['woman', 'boxing', 'hiit']
  },
  {
    id: '3',
    name: 'Mike Williams',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Yoga, Pilates',
    hourlyRate: 20,
    rating: 4.6,
    tags: ['man', 'yoga', 'pilates']
  },
  {
    id: '4',
    name: 'Amy Chen',
    image: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'CrossFit, Functional Training',
    hourlyRate: 35,
    rating: 4.7,
    tags: ['woman', 'crossfit', 'functional']
  },
  {
    id: '5',
    name: 'Daniel Brown',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Boxing, Martial Arts',
    hourlyRate: 40,
    rating: 4.9,
    tags: ['man', 'boxing', 'martial']
  },
  {
    id: '6',
    name: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Nutrition, Wellness Coaching',
    hourlyRate: 45,
    rating: 5.0,
    tags: ['woman', 'nutrition', 'wellness']
  },
  {
    id: '7',
    name: 'Robert Wilson',
    image: 'https://images.unsplash.com/photo-1594381898411-a7fcfad3dda3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Fitness, Weight Loss',
    hourlyRate: 30,
    rating: 4.7,
    tags: ['man', 'fitness', 'weight']
  },
  {
    id: '8',
    name: 'Sophia Martinez',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    specialization: 'Yoga, Meditation',
    hourlyRate: 28,
    rating: 4.8,
    tags: ['woman', 'yoga', 'meditation']
  }
];

const allTags = [...new Set(mockTrainers.flatMap(trainer => trainer.tags))];

const fetchTrainers = (searchQuery = '', selectedTags = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTrainers = mockTrainers;
      
      if (searchQuery !== '') {
        filteredTrainers = filteredTrainers.filter(trainer => 
          trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedTags.length > 0) {
        filteredTrainers = filteredTrainers.filter(trainer => 
          selectedTags.some(tag => trainer.tags.includes(tag))
        );
      }
      
      resolve(filteredTrainers);
    }, 500);
  });
};

const TrainerItem = ({ trainer, onPress }) => {
  return (
    <TouchableOpacity style={styles.trainerItem} onPress={() => onPress(trainer)}>
      <Image source={{ uri: trainer.image }} style={styles.trainerImage} />
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
          {trainer.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BookingScreen = () => {
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

      {/* Секція тегів */}
      <View style={styles.tagsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScrollView}>
          {allTags.map((tag, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.tagButton, 
                selectedTags.includes(tag) ? styles.tagSelected : {}
              ]}
              onPress={() => handleTagPress(tag)}
            >
              <Text 
                style={[
                  styles.tagButtonText, 
                  selectedTags.includes(tag) ? styles.tagTextSelected : {}
                ]}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrainerItem trainer={item} onPress={handleTrainerPress} />
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
  // Стилі для секції тегів
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
  // Стилі для списку
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
  // Стилі для тегів у картці тренера
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
  // Стилі для індикаторів завантаження та пустих результатів
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