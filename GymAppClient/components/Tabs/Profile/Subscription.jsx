import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const mockSubscriptions = [
  {
    id: '1',
    title: 'Morning Access',
    description: ['Available from 07:00 to 12:00', 'Access to the gym in the morning hours'],
    price: '$5',
    color: '#4da6ff', 
  },
  {
    id: '2',
    title: 'Premium subscription',
    description: [
      'Ulimeted enter to the gym',
      'Own couch in any time of day',
      'from 10 - 19',
    ],
    price: '$30',
    color: '#FFD700', 
  },
  {
    id: '3',
    title: 'Basic Access',
    description: ['Without personal trainer', 'Limited gym access during off-peak hours'],
    price: '$15',
    color: '#80d4a0', 
  },
];

const Subscription = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1); 
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.description.map((line, i) => (
        <Text key={i} style={styles.cardText}>{line}</Text>
      ))}
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your Subscription</Text>

      <FlatList
        ref={flatListRef}
        data={subscriptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={() => alert('Subscribed to ' + subscriptions[currentIndex].title)}>
        <Text style={styles.buttonText}>Subscribe to {subscriptions[currentIndex]?.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>⬅️ Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 40,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 0.8,
    marginHorizontal: screenWidth * 0.1 / 2,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00aaff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackText: {
    color: '#555',
    fontSize: 16,
  },
});
